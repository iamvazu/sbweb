"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Please check your inbox for the link.",
      });
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
              <span className="text-[10px] font-black tracking-[0.2em] text-brand-blue-600 uppercase">Access Recovery</span>
            </div>
            <h1 className="text-4xl font-serif text-white tracking-tight italic mb-2">
              Lost Access?
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Enter your email to receive a secure recovery link.
            </p>
          </motion.div>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden rounded-[2.5rem] p-8 md:p-10">
            {!isSent ? (
               <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recovery Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-blue-100/20 h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-blue-600 hover:bg-blue-500 h-14 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Recovery Link"}
                </Button>

                <Link 
                  href="/login" 
                  className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors pt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Login
                </Link>
              </form>
            ) : (
                <div className="text-center space-y-6 py-4">
                    <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Check Your Email</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            We've sent a secure link to <span className="text-white font-bold">{email}</span>. <br/>
                            Follow the link to reset your password.
                        </p>
                    </div>
                    <Button variant="outline" className="w-full border-white/10 text-white h-12 rounded-xl" asChild>
                        <Link href="/login">Back to Login</Link>
                    </Button>
                </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
