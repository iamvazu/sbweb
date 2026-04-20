"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords match fail", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSuccess(true);
      toast({
        title: "Password Updated",
        description: "Your new password is now active.",
      });
      setTimeout(() => router.push("/login"), 3000);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-blue-600/10 blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-brand-blue-600/5 blur-[80px]" />
      </div>

      <div className="flex-grow flex items-center justify-center pt-32 pb-16 px-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-600/10 border border-brand-blue-600/20 mb-6 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue-600" />
              <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">Secure Reset</span>
            </div>
            <h1 className="text-4xl font-serif text-white tracking-tight italic mb-2">
              New Credentials.
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Set a new secure password for your BidIQ portal access.
            </p>
          </motion.div>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden rounded-[2.5rem] p-8 md:p-10">
            {!isSuccess ? (
               <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-blue-600 hover:bg-blue-500 h-14 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
                </Button>
              </form>
            ) : (
                <div className="text-center space-y-6 py-4">
                    <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Password Secured</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            Your password has been successfully updated. <br/>
                            Redirecting you to login in a few seconds...
                        </p>
                    </div>
                </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
