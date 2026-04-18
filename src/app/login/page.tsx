"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, Building, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

    // Check onboarding status
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

    const { data, error } = await supabase.auth.signUp({
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
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Stronger<span className="text-[#1E6FD9]">Built</span>
            </h1>
            <p className="text-blue-200/60 text-sm font-medium uppercase tracking-widest mt-1">
              BidIQ Platform
            </p>
          </Link>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/20 rounded-none h-14 p-1">
              <TabsTrigger 
                value="signin" 
                className="rounded-sm data-[state=active]:bg-[#1E6FD9] data-[state=active]:text-white text-blue-100/70"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="rounded-sm data-[state=active]:bg-[#1E6FD9] data-[state=active]:text-white text-blue-100/70"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="p-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-blue-100">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="name@company.com"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-blue-100">Password</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#1E6FD9] hover:bg-[#1E6FD9]/90 h-11 text-white font-semibold shadow-lg shadow-blue-600/20"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In to BidIQ"}
                </Button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0B1F3A] px-2 text-blue-100/40">or</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full border-white/10 bg-transparent text-white hover:bg-white/5 h-11"
                  onClick={handleMagicLink}
                  disabled={isLoading}
                >
                  Continue with Magic Link
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-business" className="text-blue-100">Legal Business Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="signup-business"
                      type="text"
                      placeholder="Acme Construction LLC"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-blue-100">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-100/40" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@company.com"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-blue-100">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-blue-100">Confirm</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white placeholder:text-blue-100/30"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox id="terms" required className="mt-1 border-white/20 data-[state=checked]:bg-blue-600" />
                  <label htmlFor="terms" className="text-xs text-blue-100/60 leading-tight">
                    By signing up you agree to our{" "}
                    <Link href="/terms" className="text-blue-400 hover:underline">Terms of Use</Link> and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#1E6FD9] hover:bg-[#1E6FD9]/90 h-11 text-white font-semibold shadow-lg shadow-blue-600/20"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Free Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-blue-100/40 text-sm">
            Are you a government agency?{" "}
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 font-medium">
              Contact us <ArrowRight className="inline-block ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
