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
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setUserProfile({ ...data, email: user.email });
      }
    }
    loadProfile();

    async function loadMatchCount() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { count } = await supabase
          .from("user_bid_matches")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("pipeline_stage", "new_match");
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
        <div className="px-6">
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl font-black text-white tracking-tighter flex items-center gap-1">
              Bid<span className="text-amber-500">IQ</span>
              {isAdmin && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px] font-black tracking-widest px-1 h-3.5 uppercase ml-1">Admin</Badge>}
            </span>
            <span className="text-[9px] text-blue-200/40 font-black uppercase tracking-[0.2em] leading-none mt-1">
              {isAdmin ? "Global Mission Control" : "Strategic Procurement"}
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {currentNav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-tight transition-all duration-200
                ${pathname === item.href 
                  ? (isAdmin ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 translate-x-1' : 'bg-[#1E6FD9] text-white shadow-lg shadow-blue-500/20 translate-x-1')
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {!isAdmin && (item.badge || (item.label === "My Matches" && matchCount > 0)) && (
                <Badge className={`bg-white/10 text-white border-none text-[10px] h-5 px-1.5 ${pathname === item.href ? 'bg-white text-blue-900' : ''}`}>
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
                  ? (pathname === item.href ? 'bg-[#1E6FD9] text-white' : 'text-[#1E6FD9] hover:bg-[#1E6FD9]/10')
                  : (pathname === item.href ? 'bg-[#1E6FD9] text-white' : 'text-blue-100/60 hover:bg-white/5 hover:text-white')}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          
          <Link 
            href={isAdmin ? "/portal/admin/operations" : "/portal/settings"}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${(pathname === '/portal/admin/operations' || pathname === '/portal/settings') ? 'bg-[#1E6FD9] text-white' : 'text-blue-100/60 hover:bg-white/5 hover:text-white'}`}
          >
            {isAdmin ? <LayoutDashboard className="h-4 w-4" /> : <User className="h-4 w-4" />}
            {isAdmin ? "Internal Operations" : "Profile Settings"}
          </Link>
        </nav>

        <div className="px-3 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <Avatar className="h-8 w-8 bg-blue-600 border border-white/20">
              <AvatarFallback className="text-[10px] bg-blue-600 text-white">
                {getInitials(userProfile?.business_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {userProfile?.business_name || (isAdmin ? "Super Admin" : "Enterprise User")}
              </p>
              <Badge variant="outline" className={`text-[9px] uppercase tracking-tighter h-4 px-1 border-white/20 ${isAdmin ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'text-blue-200/60'}`}>
                {isAdmin ? "SUPER ADMIN" : (userProfile?.subscription_tier?.toUpperCase() || "FREE")}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-slate-400 hover:bg-red-500/10 hover:text-red-500 h-10 px-3 font-bold transition-all"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Log Out
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-col bg-[#0B1F3A] fixed inset-y-0 z-50">
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
                  <div className="h-full bg-[#0B1F3A]">
                    <Navigation />
                  </div>
                </SheetContent>
              </Sheet>
              
              <h2 className="text-sm font-semibold text-slate-900 hidden sm:block">
                {pathname === '/portal/vendor' && 'Dashboard'}
                {pathname === '/portal/admin' && 'Mission Control Dashboard'}
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
                {pathname === '/portal/admin/operations' && 'Internal Operations Dashboard'}
                {pathname === '/portal/settings' && (userProfile?.email?.endsWith('@strongerbuilt.us') ? 'Admin Security' : 'Company Profile')}
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
