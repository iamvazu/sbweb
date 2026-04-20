"""
BidIQ — Welcome Email Campaign
Stronger Built Group LLC

Sends personalised welcome emails to all 21,255 CaleProcure prospects.

Resend free plan: 3,000 emails/month, 100/day
Resend Pro plan:  50,000/month, no daily cap  ← recommended

The script:
  • Reads prospects from Supabase in batches of 100
  • Personalises subject + body by certification type
  • Sends via Resend API
  • Records sent timestamp back to Supabase
  • Skips already-sent, bounced, or unsubscribed rows
  • Respects EMAILS_PER_RUN cap so you can drip across days

Usage:
  export SUPABASE_URL=https://xxxx.supabase.co
  export SUPABASE_SERVICE_ROLE_KEY=eyJ...
  export RESEND_API_KEY=re_...
  export EMAILS_PER_RUN=500   # set to 3000 on free Resend plan
  python3 send_welcome_emails.py
"""

import os, json, time, urllib.request, urllib.error, urllib.parse
from datetime import datetime, timezone

# ─── ENVIRONMENT LOADER ──────────────────────────────────────────
def load_env_local():
    """Manual .env.local loader."""
    env_path = os.path.join(os.getcwd(), ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    key, val = line.strip().split("=", 1)
                    os.environ[key] = val

load_env_local()
# ───────────────────────────────────────────────────────────────────

# ─── CONFIG ────────────────────────────────────────────────────────
SUPABASE_URL         = os.getenv("NEXT_PUBLIC_SUPABASE_URL", os.getenv("SUPABASE_URL", ""))
SUPABASE_KEY         = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
RESEND_API_KEY       = os.getenv("RESEND_API_KEY", "")
FROM_EMAIL           = "Roy Krautstrunk <roy@strongerbuilt.us>"
REPLY_TO             = "info@strongerbuilt.us"
APP_URL              = os.getenv("NEXT_PUBLIC_APP_URL", os.getenv("APP_URL", "https://strongerbuilt.us"))
EMAILS_PER_RUN       = int(os.getenv("EMAILS_PER_RUN", "500"))
DELAY_BETWEEN_EMAILS = 0.05   # 20 emails/second — safe for Resend
# ───────────────────────────────────────────────────────────────────


def supabase_get(path, params=None):
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Accept": "application/json",
    })
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"❌ Supabase Get Error: {e.code} - {e.read().decode()}")
        return []


def supabase_patch(path, filter_str, data):
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{path}?{filter_str}"
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "apikey": SUPABASE_KEY,
        "Prefer": "return=minimal",
    }, method="PATCH")
    try:
        with urllib.request.urlopen(req) as r:
            return True
    except Exception as e:
        print(f"❌ Supabase Patch Error: {e}")
        return False


def send_email(to_email, subject, html):
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps({
            "from": FROM_EMAIL,
            "reply_to": REPLY_TO,
            "to": [to_email],
            "subject": subject,
            "html": html,
        }).encode(),
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as r:
            result = json.loads(r.read())
            return True, result.get("id", "ok")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return False, f"HTTP {e.code}: {body[:200]}"
    except Exception as ex:
        return False, str(ex)


def build_subject(prospect):
    """Personalise subject line by cert type."""
    certs  = prospect.get("cert_types") or []
    name   = prospect.get("first_name") or (
             (prospect.get("legal_name") or "")[:20])

    if "DVBE" in certs:
        return f"{name}, your DVBE cert qualifies you for thousands of CA government bids"
    if "SB-PW" in certs:
        return f"{name}, BidIQ found prevailing-wage bids matching your business"
    if "SB(Micro)" in certs:
        return f"{name}, see which CA government contracts are set aside for your business"
    return f"{name}, California government bids matched to your business — free to try"


def build_html(prospect):
    """Build personalised HTML email."""
    certs      = prospect.get("cert_types") or []
    first      = prospect.get("first_name") or "there"
    biz        = prospect.get("legal_name", "your business")
    city       = prospect.get("city") or "California"
    areas      = prospect.get("service_areas") or []
    area_str   = ", ".join(areas[:3]) + (" and more" if len(areas) > 3 else "") if areas else "California"
    signup_url = f"{APP_URL}/portal"
    unsub_url  = f"{APP_URL}/unsubscribe?email={urllib.parse.quote(prospect['email'])}"

    # Personalise the cert mention
    if "DVBE" in certs:
        cert_line = ("As a certified <strong>DVBE (Disabled Veteran Business Enterprise)</strong>, "
                     "you are eligible for set-aside contracts across every California state agency, "
                     "city, and county. Most DVBE-eligible bids receive very few submissions — "
                     "your certification is a real advantage.")
    elif "SB-PW" in certs:
        cert_line = ("As a <strong>SB-PW certified business</strong>, you are eligible for "
                     "prevailing-wage public works contracts — roads, buildings, utilities — "
                     "across California. We flag every prevailing-wage bid automatically "
                     "so you never miss a fit.")
    elif "SB(Micro)" in certs:
        cert_line = ("As a certified <strong>California Small Business (Micro)</strong>, "
                     "you qualify for thousands of set-aside contracts that larger competitors "
                     "cannot bid on. We surface only the bids you are actually eligible to win.")
    else:
        cert_line = ("Your business is registered in the CaleProcure supplier database, "
                     "which means California state and local agencies can already find you. "
                     "BidIQ makes sure you find them first.")

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0B1F3A;background:#ffffff;">

  <div style="margin-bottom:28px;">
    <span style="font-size:22px;font-weight:700;color:#1E6FD9;">BidIQ</span>
    <span style="font-size:13px;color:#888;margin-left:8px;">by StrongerBuilt · San Diego, CA</span>
  </div>

  <h1 style="font-size:22px;font-weight:700;color:#0B1F3A;margin:0 0 16px;line-height:1.35;">
    Hi {first}, we found government bids that match {biz}.
  </h1>

  <p style="font-size:15px;line-height:1.7;margin:0 0 16px;color:#333;">
    My name is Roy Krautstrunk. I'm the founder of BidIQ and a licensed SDVOSB/DVBE 
    general contractor in San Diego (CSLB #1057434). I built this platform because 
    I know firsthand how hard it is to find the right government bids — and how much 
    money gets left on the table when small businesses miss deadlines or submit 
    on the wrong contracts.
  </p>

  <p style="font-size:15px;line-height:1.7;margin:0 0 16px;color:#333;">
    {cert_line}
  </p>

  <div style="background:#F5F8FF;border-left:4px solid #1E6FD9;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
    <p style="margin:0 0 10px;font-weight:700;font-size:15px;">
      What BidIQ does for {biz}:
    </p>
    <p style="margin:4px 0;font-size:14px;">✓ Scans 127+ California procurement portals every day at 3 PM</p>
    <p style="margin:4px 0;font-size:14px;">✓ Matches bids to your certifications, NAICS codes, and {area_str}</p>
    <p style="margin:4px 0;font-size:14px;">✓ Flags mandatory pre-bid meetings before they pass</p>
    <p style="margin:4px 0;font-size:14px;">✓ Generates a full AI bid plan — scope, compliance, and SWOT</p>
    <p style="margin:4px 0;font-size:14px;">✓ Optionally: we submit the bid for you, start to finish</p>
  </div>

  <p style="font-size:15px;line-height:1.7;margin:0 0 24px;color:#333;">
    It is <strong>free to try</strong> — set up your profile in 5 minutes and see your 
    first matched bids tonight.
  </p>

  <div style="text-align:center;margin:28px 0;">
    <a href="{signup_url}"
       style="background:#1E6FD9;color:white;text-decoration:none;padding:14px 36px;
              border-radius:8px;font-weight:700;font-size:16px;display:inline-block;">
      See my matched bids — free →
    </a>
    <p style="font-size:12px;color:#888;margin:10px 0 0;">
      No credit card · Set up in 5 minutes · Cancel anytime
    </p>
  </div>

  <p style="font-size:15px;line-height:1.7;margin:0 0 8px;color:#333;">
    If you have questions or want to talk through a specific bid, reply to this 
    email or call me directly at <strong>831-760-0806</strong>. I answer.
  </p>

  <p style="font-size:15px;line-height:1.7;margin:0 0 32px;color:#333;">
    — Roy Krautstrunk<br>
    <span style="color:#888;font-size:13px;">Founder, BidIQ · StrongerBuilt LLC · San Diego, CA<br>
    CSLB #1057434 · SDVOSB · DVBE</span>
  </p>

  <hr style="border:none;border-top:0.5px solid #e5e7eb;margin:24px 0;">
  <p style="font-size:11px;color:#aaa;line-height:1.6;">
    You are receiving this because <strong>{biz}</strong> is registered in the 
    CaleProcure state supplier database. We looked you up there — we didn't buy 
    your email from anyone.<br><br>
    StrongerBuilt LLC · 4370 1/2 Oregon St · San Diego, CA 92104<br>
    <a href="{unsub_url}" style="color:#aaa;">Unsubscribe</a>
  </p>

</body>
</html>"""


def run():
    if not all([SUPABASE_URL, SUPABASE_KEY, RESEND_API_KEY]):
        print("[ERROR] Missing env vars. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY")
        return

    print(f"\n{'='*60}")
    print(f"  BidIQ Welcome Campaign  -  Cap: {EMAILS_PER_RUN:,}/run")
    print(f"{'='*60}\n")

    sent = failed = skipped = 0
    offset = 0
    PAGE   = 100

    while sent < EMAILS_PER_RUN:
        remaining = EMAILS_PER_RUN - sent
        limit      = min(PAGE, remaining)

        prospects = supabase_get("prospects", {
            "select":  "id,email,first_name,legal_name,cert_types,city,service_areas",
            "status":  "eq.prospect",
            "order":   "created_at.asc",
            "limit":   limit,
            "offset":  offset,
        })

        if not prospects:
            print(f"\n  No more prospects to send. Done.")
            break

        for p in prospects:
            subject = build_subject(p)
            html    = build_html(p)

            ok, result = send_email(p["email"], subject, html)

            if ok:
                # Record the send in Supabase
                supabase_patch(
                    "prospects",
                    f"id=eq.{p['id']}",
                    {
                        "status":           "email_sent",
                        "welcome_sent_at":  datetime.now(timezone.utc).isoformat(),
                    }
                )
                sent += 1
                print(f"  [OK]  [{sent:>5}/{EMAILS_PER_RUN}]  {p['email'][:45]}")
            else:
                # Mark hard bounces to stop retrying
                if "bounced" in result.lower() or "invalid" in result.lower():
                    supabase_patch("prospects", f"id=eq.{p['id']}",
                                   {"status": "bounced", "bounce_type": "hard"})
                failed += 1
                print(f"  [FAIL]  {p['email'][:45]}  -  {result[:60]}")

            time.sleep(DELAY_BETWEEN_EMAILS)

        offset += len(prospects)
        if len(prospects) < limit:
            break

    print(f"\n{'='*60}")
    print(f"  DONE  -  SENT: {sent:,}  -  FAILED: {failed:,}")
    print(f"{'='*60}\n")
    print("Run again tomorrow (or raise EMAILS_PER_RUN) to continue the drip.\n")


if __name__ == "__main__":
    run()
