"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Phone, MapPin, Award, ShieldCheck, CreditCard, User, Save, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({
        business_name: profile.business_name,
        dba: profile.dba,
        phone: profile.phone,
        address: profile.address,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your business information has been saved.",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-navy-900 dark:text-white tracking-tight">Company <span className="text-brand-blue-600">Profile</span></h1>
          <p className="text-slate-500 font-medium">Manage your business credentials and BidIQ platform preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-success/10 text-success border-success/20 py-1.5 px-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-2" />
            Verified Contractor
          </Badge>
          <Badge className="bg-brand-blue-600 text-white py-1.5 px-3 uppercase tracking-tighter">
            {profile?.subscription_tier || "FREE"} Plan
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Main info */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-xl shadow-brand-blue-600/5 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-blue-600" />
                <CardTitle className="text-lg">Business Identity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Legal Business Name</Label>
                  <Input 
                    value={profile?.business_name || ""} 
                    onChange={(e) => setProfile({...profile, business_name: e.target.value})}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">DBA (Operating Name)</Label>
                  <Input 
                    value={profile?.dba || ""} 
                    onChange={(e) => setProfile({...profile, dba: e.target.value})}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      value={profile?.phone || ""} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="h-11 pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      value={profile?.email || ""} 
                      disabled
                      className="h-11 pl-10 rounded-xl bg-slate-50 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2 col-span-full">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Office Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      value={profile?.address || ""} 
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="h-11 pl-10 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t p-6 flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-brand-blue-600 hover:bg-blue-500 min-w-[140px] rounded-xl font-bold"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-xl shadow-brand-blue-600/5">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-blue-600" />
                <CardTitle className="text-lg">Compliance & Credentials</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl border bg-slate-50/30">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">CSLB License</p>
                  <p className="font-bold text-slate-900">{profile?.cslb_license || "Not Provided"}</p>
                </div>
                <div className="p-4 rounded-2xl border bg-slate-50/30">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">DIR Registration</p>
                  <p className="font-bold text-slate-900">{profile?.dir_registration || "In Process"}</p>
                </div>
                <div className="p-4 rounded-2xl border bg-slate-50/30">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Primary NAICS</p>
                  <p className="font-bold text-slate-900">{profile?.naics_codes?.[0] || "TBD"}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Active Certifications</Label>
                <div className="flex flex-wrap gap-2">
                  {profile?.certifications?.map((cert: string) => (
                    <Badge key={cert} variant="outline" className="py-1 px-3 border-brand-blue-600/20 text-brand-blue-600 bg-brand-blue-600/5">
                      {cert}
                    </Badge>
                  ))}
                  {(!profile?.certifications || profile.certifications.length === 0) && (
                    <p className="text-sm text-slate-400 italic">No certifications added during onboarding.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Account / Quick stats */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl shadow-brand-blue-600/5 overflow-hidden">
            <div className="h-2 bg-brand-blue-600" />
            <CardHeader>
              <CardTitle className="text-lg">Subscription</CardTitle>
              <CardDescription>Your current BidIQ service tier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-brand-navy-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue-600/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-200/60 mb-1">Current Tier</h4>
                <p className="text-2xl font-black">{profile?.subscription_tier?.toUpperCase() || "FREE"}</p>
                <p className="text-[10px] text-blue-200/40 mt-4 leading-relaxed">
                  You are viewing up to 50 bid matches per day. Upgrade to PRO for deeper analysis and export tools.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/portal/hire")}
                variant="outline" 
                className="w-full border-brand-blue-600 text-brand-blue-600 hover:bg-brand-blue-600/5 rounded-xl font-bold h-11"
              >
                Upgrade Account
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-brand-blue-600/5">
            <CardHeader>
              <CardTitle className="text-lg">Security</CardTitle>
              <CardDescription>Authentication and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 px-3 rounded-xl">
                <Lock className="w-4 h-4 mr-3 text-slate-400" />
                Change Password
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50 px-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 mr-3 text-slate-400" />
                2FA Settings
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 px-3 rounded-xl">
                <User className="w-4 h-4 mr-3 text-red-300" />
                Delete Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      {/* Plan Selection Section */}
      <div className="pt-8">
        <Card className="border-none shadow-xl shadow-brand-blue-600/5 overflow-hidden">
          <CardHeader className="bg-slate-900 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Bid IQ Plans</CardTitle>
                <CardDescription className="text-blue-200/40 font-medium">Select a tier to scale your government procurement strategy.</CardDescription>
              </div>
              <Badge variant="outline" className="border-blue-200/20 text-blue-200 uppercase tracking-widest text-[10px]">
                Current: {profile?.subscription_tier?.toUpperCase() || "FREE"}
              </Badge>
            </div>
          </Header>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Scout Card */}
              <div className="p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col hover:border-brand-blue-600/20 transition-all group">
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-slate-100 text-slate-500 uppercase text-[9px] font-black">Scout</Badge>
                      <span className="text-2xl font-black text-brand-navy-900">$49<span className="text-xs text-slate-400 font-medium">/mo</span></span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      100 bid alerts for your services per month. Cal eProcure State Portal access.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> 100 Bid Alerts</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> State Portal Access</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> AI Fit Scoring</li>
                    </ul>
                  </div>
                  <Button 
                  onClick={() => router.push("/portal/hire")}
                  disabled={profile?.subscription_tier === 'scout'}
                  className="w-full mt-6 rounded-xl font-bold bg-brand-navy-900"
                  >
                    {profile?.subscription_tier === 'scout' ? 'Current Plan' : 'Select Scout'}
                  </Button>
              </div>

              {/* Pro Card */}
              <div className="p-6 rounded-[2rem] border-2 border-brand-blue-600 bg-brand-blue-600/5 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-blue-600 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl">Best Value</div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-brand-blue-600 text-white uppercase text-[9px] font-black">Pro</Badge>
                      <span className="text-2xl font-black text-brand-navy-900">$99<span className="text-xs text-slate-400 font-medium">/mo</span></span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      All 25+ California state, city, county and educational portals. Unlimited alerts.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> Unlimited Alerts</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> 25+ CA Portals</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> AI Deep Analysis</li>
                    </ul>
                  </div>
                  <Button 
                  onClick={() => router.push("/portal/hire")}
                  disabled={profile?.subscription_tier === 'pro'}
                  className="w-full mt-6 rounded-xl font-bold bg-brand-blue-600"
                  >
                    {profile?.subscription_tier === 'pro' ? 'Current Plan' : 'Select Pro'}
                  </Button>
              </div>

              {/* Managed Card */}
              <div className="p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-success/10 text-success uppercase text-[9px] font-black">Managed</Badge>
                      <span className="text-2xl font-black text-brand-navy-900">$249<span className="text-xs text-slate-400 font-medium">/bid</span></span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Full-service bid submission. We write and file the proposal for you.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> RFP Technical Writing</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> DIR Compliance Audit</li>
                      <li className="flex items-center gap-2 text-[10px] font-bold text-slate-600"><CheckCircle2 className="w-3 h-3 text-green-500" /> Full Submission Filing</li>
                    </ul>
                  </div>
                  <Button 
                  onClick={() => router.push("/portal/hire")}
                  className="w-full mt-6 rounded-xl font-bold bg-slate-100 text-slate-900 hover:bg-slate-200"
                  >
                    Hire Experts
                  </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
