"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, Building, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check admin status first
    const isAdmin = email.endsWith('@strongerbuilt.us') || email === 'roy@strongerbuilt.us' || email === 'crazyme2207@gmail.com';
    
    if (isAdmin) {
      router.push("/portal/admin");
      return;
    }

    // Check onboarding status for regular users
    const { data: profile } = await supabase
      .from("users")
      .select("onboarding_complete")
      .single();

    if (profile?.onboarding_complete) {
      router.push("/portal/vendor");
    } else {
      router.push("/portal/onboarding");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
        },
      },
    });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Account Created",
      description: "Please check your email for the confirmation link.",
    });
    setIsLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email for the magic link.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: "Magic Link Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Magic Link Sent",
        description: "Check your email for the login link.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-navy-900 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10 bg-[radial-gradient(#1E6FD9_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="flex-grow flex items-center justify-center pt-32 pb-16 px-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-6 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-600" />
              <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">Secure Portal Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight italic mb-2">
              BidIQ Platform.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Strategic procurement and bid management for professionals.
            </p>
          </motion.div>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden rounded-[2.5rem]">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/40 rounded-none h-14 p-1">
                <TabsTrigger 
                  value="signin" 
                  className="rounded-full text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 text-blue-100/70 transition-all"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-full text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-brand-navy-900 text-blue-100/70 transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="p-8 md:p-10">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="name@company.com"
                        className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl focus:ring-brand-blue-600 focus:border-brand-blue-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                      <Link 
                        href="/forgot-password" 
                        className="text-[10px] font-black uppercase tracking-widest text-brand-blue-600 hover:text-blue-400 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl focus:ring-brand-blue-600 focus:border-brand-blue-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue-600 hover:bg-blue-500 h-14 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Access"}
                  </Button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/5"></span>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black">
                      <span className="bg-[#0B1F3A] px-4 text-slate-500">Secure OTP</span>
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full border-white/10 bg-transparent text-white hover:bg-white/5 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    onClick={handleMagicLink}
                    disabled={isLoading}
                  >
                    Continue with Magic Link
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="p-8 md:p-10">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-business" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Business Name</Label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                      <Input
                        id="signup-business"
                        type="text"
                        placeholder="Business Entity"
                        className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@company.com"
                        className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl text-xs"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl text-xs"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="terms" required className="mt-1 border-white/20 data-[state=checked]:bg-brand-blue-600" />
                    <label htmlFor="terms" className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-wider">
                      I agree to the{" "}
                      <Link href="/terms" className="text-brand-blue-600 hover:underline">Terms</Link> and{" "}
                      <Link href="/privacy" className="text-brand-blue-600 hover:underline">Privacy</Link>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-white text-brand-navy-900 hover:bg-slate-100 h-14 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-brand-navy-900" /> : "Create Access Credentials"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em]">
              Are you a government agency?{" "}
              <Link href="/contact" className="text-brand-blue-600 hover:text-blue-400 font-black transition-colors">
                Contact Procurement <ArrowRight className="inline-block ml-1 h-3 w-3" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
