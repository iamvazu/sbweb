"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  LayoutDashboard, 
  Star, 
  Search, 
  Kanban, 
  BarChart2, 
  LogOut,
  Bell,
  RefreshCw,
  Menu,
  ChevronRight,
  ShieldAlert,
  Handshake,
  FileCheck,
  TrendingUp,
  Terminal,
  Users,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: number;
}

const VENDOR_NAV: NavItem[] = [
  { label: "Dashboard", href: "/portal/vendor", icon: LayoutDashboard },
  { label: "My Matches", href: "/portal/matches", icon: Star },
  { label: "Browse All Bids", href: "/portal/bids", icon: Search },
  { label: "My Pipeline", href: "/portal/pipeline", icon: Kanban },
  { label: "Analytics", href: "/portal/analytics", icon: BarChart2 },
];

const ADMIN_NAV: NavItem[] = [
  { label: "Mission Control", href: "/portal/admin", icon: ShieldAlert },
  { label: "Prospect Registry", href: "/portal/admin/prospects", icon: Users },
  { label: "Global Marketplace", href: "/portal/bids", icon: Search },
  { label: "Prospective Matches", href: "/portal/admin/matches", icon: Star },
  { label: "Partner Review", href: "/portal/admin/partners", icon: Handshake },
  { label: "System Logs", href: "/portal/admin/logs", icon: Terminal },
];

const SECONDARY_NAV = [
  { label: "Hire Us", href: "/portal/hire", icon: Handshake, highlight: true },
  { label: "My Engagements", href: "/portal/engagements", icon: FileCheck },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [matchCount, setMatchCount] = React.useState<number>(0);

  React.useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Admin redirect check
        const isAdmin = user.email?.endsWith('@strongerbuilt.us') || 
                        user.email === 'roy@strongerbuilt.us' || 
                        user.email === 'crazyme2207@gmail.com';
        
        if (isAdmin && pathname === '/portal/vendor') {
          router.push('/portal/admin');
          return;
        }

        // First try to get the profile
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (error && error.code === 'PGRST116') {
          // Row missing! Create it.
          const { data: newData, error: upsertError } = await supabase
            .from('users')
            .upsert({
              id: user.id,
              email: user.email,
              business_name: user.user_metadata?.business_name || 'New User',
              onboarding_complete: false,
              subscription_tier: 'free'
            }, { onConflict: 'id' })
            .select()
            .single();
          
          if (!upsertError) {
            setUserProfile({ ...newData, email: user.email });
          }
        } else if (data) {
          setUserProfile({ ...data, email: user.email });
        } else {
          setUserProfile({ email: user.email });
        }
      }
    }
    loadProfile();

    async function loadMatchCount() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { count } = await supabase
          .from("user_bid_matches")
          .select("*, bids!inner(end_date)", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("pipeline_stage", "new_match")
          .gte("bids.end_date", new Date().toISOString());
        setMatchCount(count || 0);
      }
    }
    loadMatchCount();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const Navigation = () => {
    const isAdmin = userProfile?.email?.endsWith('@strongerbuilt.us') || 
                    userProfile?.email === 'roy@strongerbuilt.us' || 
                    userProfile?.email === 'crazyme2207@gmail.com';
    
    const currentNav = isAdmin ? ADMIN_NAV : VENDOR_NAV;

    return (
      <div className="flex flex-col h-full py-6 space-y-8">
        <div className="px-6 space-y-2.5">
          <Link href="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-black tracking-tight leading-none text-white">
              STRONGER<span className="text-blue-500">built</span>
              {isAdmin && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px] font-black tracking-widest px-1 h-3.5 uppercase ml-1">Admin</Badge>}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase leading-none mt-1.5">
              {isAdmin ? "Global Mission Control" : "Strategic Bids Portal"}
            </span>
          </Link>
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-white transition-colors">
              &larr; Back to Homepage
            </Link>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {currentNav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-tight transition-all duration-200
                ${pathname === item.href 
                  ? (isAdmin 
                      ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/5 text-amber-200 border-l-4 border-amber-500 shadow-lg shadow-amber-500/10 translate-x-1' 
                      : 'bg-gradient-to-r from-blue-500/25 to-blue-500/5 text-blue-200 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10 translate-x-1')
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {!isAdmin && (item.badge || (item.label === "My Matches" && matchCount > 0)) && (
                <Badge className={`bg-white/10 text-white border-none text-[10px] h-5 px-1.5 ${pathname === item.href ? 'bg-blue-500/20 text-blue-400' : ''}`}>
                  {item.label === "My Matches" ? matchCount : item.badge}
                </Badge>
              )}
            </Link>
          ))}

          <div className="py-4">
            <Separator className="bg-white/10" />
          </div>

          {!isAdmin && SECONDARY_NAV.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${item.highlight 
                  ? (pathname === item.href 
                      ? 'bg-gradient-to-r from-blue-500/25 to-blue-500/5 text-blue-200 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10 translate-x-1' 
                      : 'text-blue-400 hover:bg-blue-950/20')
                  : (pathname === item.href 
                      ? 'bg-gradient-to-r from-blue-500/25 to-blue-500/5 text-blue-200 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10 translate-x-1' 
                      : 'text-blue-100/60 hover:bg-white/5 hover:text-white')}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          
          <Link 
            href="/portal/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${pathname === '/portal/settings' 
                ? 'bg-gradient-to-r from-blue-500/25 to-blue-500/5 text-blue-200 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10 translate-x-1' 
                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            <User className="h-4 w-4" />
            {isAdmin ? "Admin Profile" : "Company Profile"}
          </Link>

          {!isAdmin && (
            <div className="mt-6 mx-2 p-4 rounded-2xl bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent border border-blue-500/20 shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="relative z-10 space-y-2">
                <span className="inline-block text-[9px] font-black tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full uppercase">
                  Featured Service
                </span>
                <h4 className="text-xs font-bold text-white tracking-tight">Need Bid Writing Experts?</h4>
                <p className="text-[10.5px] text-slate-400 leading-normal">
                  Get our premium proposal service with the <b>success-fee option</b>.
                </p>
                <Link 
                  href="/portal/hire"
                  className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors pt-1"
                >
                  Hire Us Today <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="px-3 pt-4 pb-6 border-t border-slate-800/40 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
            <Avatar className="h-8 w-8 bg-blue-600 border border-white/10 shadow-sm shrink-0">
              <AvatarFallback className="text-[10px] bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold">
                {getInitials(userProfile?.business_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {userProfile?.business_name || (isAdmin ? "Super Admin" : "Enterprise User")}
              </p>
              <Badge variant="outline" className={`text-[8px] font-bold uppercase tracking-widest h-4 px-1.5 border-transparent ${isAdmin ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {isAdmin ? "SUPER ADMIN" : (userProfile?.subscription_tier?.toUpperCase() || "FREE")}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-slate-400 hover:bg-red-500/10 hover:text-red-400 h-10 px-3 font-bold rounded-xl transition-all"
          >
            <LogOut className="h-4 w-4 mr-3 text-slate-400 group-hover:text-red-400" />
            Log Out
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-col bg-gradient-to-b from-[#0B1528] via-[#090F1E] to-[#040811] border-r border-slate-800/60 fixed inset-y-0 z-50 shadow-2xl">
        <Navigation />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[260px] w-full min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 border-none w-[260px]">
                  <div className="h-full bg-gradient-to-b from-[#0B1528] via-[#090F1E] to-[#040811] border-r border-slate-800/60">
                    <Navigation />
                  </div>
                </SheetContent>
              </Sheet>
              
              <h2 className="text-sm font-semibold text-slate-900 hidden sm:block">
                {pathname === '/portal/vendor' && 'Dashboard'}
                {pathname === '/portal/admin' && 'Mission Control Hub'}
                {pathname === '/portal/admin/prospects' && 'Prospect Registry'}
                {pathname === '/portal/admin/matches' && 'Prospective Match Hub'}
                {pathname === '/portal/admin/partners' && 'Partner Review Center'}
                {pathname === '/portal/admin/logs' && 'System Mission Logs'}
                {pathname === '/portal/matches' && 'My Matched Bids'}
                {pathname === '/portal/bids' && 'Marketplace Browse'}
                {pathname === '/portal/pipeline' && 'Bid Pipeline'}
                {pathname === '/portal/analytics' && 'Intelligence Analytics'}
                {pathname === '/portal/hire' && 'Hire Expert Management'}
                {pathname === '/portal/engagements' && 'Active Projects'}
                {pathname === '/portal/settings' && (userProfile?.email?.endsWith('@strongerbuilt.us') || userProfile?.email === 'roy@strongerbuilt.us' ? 'Admin Profile' : 'Company Profile')}
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-slate-100 text-slate-500 hover:bg-slate-100 font-medium h-7 flex items-center gap-2 px-3 border-none">
                <RefreshCw className="h-3 w-3" />
                <span className="text-[10px]">Last sync: 3:04 PM Pacific</span>
              </Badge>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 min-h-[calc(100vh-64px)] overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex h-16 items-center justify-around px-2">
        <Link href="/portal/vendor" className={`flex flex-col items-center gap-1 ${pathname === '/portal/vendor' ? 'text-[#1E6FD9]' : 'text-slate-400'}`}>
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link href="/portal/matches" className={`flex flex-col items-center gap-1 ${pathname === '/portal/matches' ? 'text-[#1E6FD9]' : 'text-slate-400'}`}>
          <Star className="h-5 w-5" />
          <span className="text-[10px] font-medium">Matches</span>
        </Link>
        <Link href="/portal/hire" className={`flex flex-col items-center gap-1 ${pathname === '/portal/hire' ? 'text-[#1E6FD9]' : 'text-slate-400'}`}>
          <Handshake className="h-5 w-5" />
          <span className="text-[10px] font-medium">Hire Us</span>
        </Link>
        <Link href="/portal/pipeline" className={`flex flex-col items-center gap-1 ${pathname === '/portal/pipeline' ? 'text-[#1E6FD9]' : 'text-slate-400'}`}>
          <Kanban className="h-5 w-5" />
          <span className="text-[10px] font-medium">Pipeline</span>
        </Link>
        <Link href="/portal/settings" className={`flex flex-col items-center gap-1 ${pathname === '/portal/settings' ? 'text-[#1E6FD9]' : 'text-slate-400'}`}>
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
