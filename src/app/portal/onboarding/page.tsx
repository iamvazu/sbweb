"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Award, 
  Code2, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  X,
  Plus
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { COUNTIES } from "@/lib/data/counties";
import { useToast } from "@/hooks/use-toast";

const CSLB_CLASSES = [
  "A", "B", "C-2", "C-4", "C-5", "C-6", "C-7", "C-8", "C-9", "C-10", 
  "C-15", "C-16", "C-17", "C-20", "C-21", "C-22", "C-23", "C-27", 
  "C-28", "C-29", "C-31", "C-32", "C-33", "C-34", "C-35", "C-36",
  "C-38", "C-39", "C-42", "C-43", "C-45", "C-46", "C-47", "C-50",
  "C-51", "C-53", "C-54", "C-55", "C-57", "C-60", "C-61", "D-03",
  "D-06", "D-09", "D-12", "D-16", "D-28", "D-29", "D-30", "D-31",
  "D-34", "D-35", "D-38", "D-40", "D-41", "D-42", "D-43", "D-49",
  "D-50", "D-52", "D-53", "D-56", "D-57", "D-59", "D-62", "D-63",
  "D-64", "D-65", "HAZ", "ASB", "DW"
];

const NAICS_CATEGORIES: Record<string, string[]> = {
  "Construction": ["236220", "237310", "238210", "238220"],
  "Janitorial": ["561720"],
  "IT Services": ["541511", "541512", "541519"],
  "Staffing": ["561320"],
  "Environmental": ["562910"],
  "Professional Services": ["541611"],
  "Landscaping": ["561730"],
  "Security": ["561612"],
  "Food Services": ["722310"],
  "Transportation": ["484110"]
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    business_name: "",
    dba: "",
    entity_type: "",
    ein: "",
    phone: "",
    address: "",
    certifications: [],
    cslb_license: "",
    cslb_classes: [],
    dir_registration: "",
    sam_uei: "",
    naics_codes: [],
    counties_served: [],
    max_radius: "50",
    max_contract_value: "",
    max_concurrent_bids: "5",
    bonding_capacity: "",
    exclusion_keywords: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFormData((prev: any) => ({
          ...prev,
          ...data,
          business_name: data.business_name || "",
        }));
      }
    }
    loadData();
  }, [supabase]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step < 5) {
      // Periodic save to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("users").update(formData).eq("id", user.id);
      }
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({
        ...formData,
        onboarding_complete: true
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    } else {
      router.push("/portal/vendor");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0B1F3A]">Business Onboarding</h1>
            <span className="text-sm font-medium text-slate-500">Step {step} of 5</span>
          </div>
          <Progress value={(step / 5) * 100} className="h-2 bg-slate-200" indicatorClassName="bg-[#1E6FD9]" />
          
          <div className="flex justify-between px-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                  ${step === i ? 'border-[#1E6FD9] bg-white text-[#1E6FD9]' : 
                    step > i ? 'border-[#1E6FD9] bg-[#1E6FD9] text-white' : 
                    'border-slate-200 bg-slate-100 text-slate-400'}`}
              >
                {step > i ? <CheckCircle2 className="h-4 w-4" /> : i}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl border-none">
          <CardContent className="pt-8">
            {step === 1 && <Step1 data={formData} update={updateFormData} />}
            {step === 2 && <Step2 data={formData} update={updateFormData} />}
            {step === 3 && <Step3 data={formData} update={updateFormData} />}
            {step === 4 && <Step4 data={formData} update={updateFormData} />}
            {step === 5 && <Step5 data={formData} />}
          </CardContent>
          <CardFooter className="flex justify-between bg-slate-50/50 rounded-b-xl border-t p-6">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={step === 1}
              className="border-slate-300 text-slate-600"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={isLoading}
              className="bg-[#1E6FD9] hover:bg-[#1E6FD9]/90 text-white min-w-[120px]"
            >
              {isLoading ? "Saving..." : step === 5 ? "Complete Setup" : "Next Step"}
              {step < 5 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function Step1({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="h-6 w-6 text-[#1E6FD9]" />
        <h2 className="text-xl font-semibold text-slate-800">Business Basics</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Legal Business Name</Label>
          <Input 
            value={data.business_name} 
            onChange={(e) => update("business_name", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label>DBA / Operating Name (Optional)</Label>
          <Input 
            value={data.dba} 
            onChange={(e) => update("dba", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label>Entity Type</Label>
          <Select value={data.entity_type} onValueChange={(v) => update("entity_type", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select entity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
              <SelectItem value="sole_prop">Sole Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="joint_venture">Joint Venture</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>EIN (Format: XX-XXXXXXX)</Label>
          <Input 
            placeholder="39-XXXXXXX" 
            value={data.ein} 
            onChange={(e) => update("ein", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label>Business Phone</Label>
          <Input 
            value={data.phone} 
            onChange={(e) => update("phone", e.target.value)} 
          />
        </div>
        <div className="space-y-2 col-span-full">
          <Label>Business Address</Label>
          <Input 
            value={data.address} 
            onChange={(e) => update("address", e.target.value)} 
            placeholder="Street, City, State, ZIP"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ data, update }: any) {
  const toggleCert = (cert: string) => {
    const certs = data.certifications.includes(cert) 
      ? data.certifications.filter((c: any) => c !== cert)
      : [...data.certifications, cert];
    update("certifications", certs);
  };

  const toggleClass = (cls: string) => {
    const classes = data.cslb_classes.includes(cls)
      ? data.cslb_classes.filter((c: any) => c !== cls)
      : [...data.cslb_classes, cls];
    update("cslb_classes", classes);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-6 w-6 text-[#1E6FD9]" />
        <h2 className="text-xl font-semibold text-slate-800">Certifications & Licensing</h2>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">Business Certifications</Label>
        <div className="grid md:grid-cols-2 gap-4">
          {["SDVOSB", "DVBE", "DBE", "SBE", "WBE", "MBE", "HUBZone"].map((cert) => (
            <div key={cert} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 bg-white">
              <Checkbox id={cert} checked={data.certifications.includes(cert)} onCheckedChange={() => toggleCert(cert)} />
              <Label htmlFor={cert} className="flex-1 cursor-pointer font-medium">{cert}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-2">
          <Label>CSLB License Number</Label>
          <Input value={data.cslb_license} onChange={(e) => update("cslb_license", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>DIR Registration Number</Label>
          <Input value={data.dir_registration} onChange={(e) => update("dir_registration", e.target.value)} />
        </div>
        <div className="space-y-2 col-span-full">
          <Label>CSLB License Classes</Label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-slate-50">
            {CSLB_CLASSES.map((cls) => (
              <Badge 
                key={cls} 
                variant={data.cslb_classes.includes(cls) ? "default" : "outline"}
                className={`cursor-pointer ${data.cslb_classes.includes(cls) ? 'bg-[#1E6FD9]' : 'text-slate-500'}`}
                onClick={() => toggleClass(cls)}
              >
                {cls}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ data, update }: any) {
  const [tempCode, setTempCode] = useState("");

  const addCode = (code: string) => {
    if (code && !data.naics_codes.includes(code)) {
      update("naics_codes", [...data.naics_codes, code]);
    }
  };

  const removeCode = (code: string) => {
    update("naics_codes", data.naics_codes.filter((c: any) => c !== code));
  };

  const addCategory = (cat: string) => {
    const codes = NAICS_CATEGORIES[cat];
    const newCodes = Array.from(new Set([...data.naics_codes, ...codes]));
    update("naics_codes", newCodes);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <Code2 className="h-6 w-6 text-[#1E6FD9]" />
        <h2 className="text-xl font-semibold text-slate-800">Industry (NAICS) Codes</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-500">NAICS codes help BidIQ match you with relevant government contracts.</p>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter 6-digit NAICS code" 
            value={tempCode} 
            onChange={(e) => setTempCode(e.target.value)} 
          />
          <Button variant="secondary" onClick={() => { addCode(tempCode); setTempCode(""); }}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.naics_codes.map((code: string) => (
            <Badge key={code} className="bg-slate-800 py-1.5 pl-3 pr-2 flex items-center gap-1.5">
              {code}
              <X className="h-3 w-3 cursor-pointer hover:text-red-400" onClick={() => removeCode(code)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <Label>Quick add by industry:</Label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(NAICS_CATEGORIES).map((cat) => (
            <Button key={cat} variant="outline" size="sm" onClick={() => addCategory(cat)} className="rounded-full">
              {cat}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, update }: any) {
  const toggleCounty = (slug: string) => {
    const counties = data.counties_served.includes(slug)
      ? data.counties_served.filter((s: any) => s !== slug)
      : [...data.counties_served, slug];
    update("counties_served", counties);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="h-6 w-6 text-[#1E6FD9]" />
        <h2 className="text-xl font-semibold text-slate-800">Service Geography</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-base">Target Counties in California</Label>
          <div className="flex gap-2">
            <Button variant="link" size="sm" onClick={() => update("counties_served", COUNTIES.map(c => c.slug))}>Select All</Button>
            <Button variant="link" size="sm" onClick={() => update("counties_served", [])}>Clear All</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 h-64 overflow-y-auto p-4 border rounded-lg bg-slate-50">
          {COUNTIES.map((c) => (
            <div key={c.slug} className="flex items-center space-x-2">
              <Checkbox id={c.slug} checked={data.counties_served.includes(c.slug)} onCheckedChange={() => toggleCounty(c.slug)} />
              <Label htmlFor={c.slug} className="text-xs cursor-pointer truncate">{c.name}</Label>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-4">
          <Label>Maximum Travel Radius</Label>
          <Select value={data.max_radius} onValueChange={(v) => update("max_radius", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
              <SelectItem value="150">150 miles</SelectItem>
              <SelectItem value="200">200 miles</SelectItem>
              <SelectItem value="statewide">Statewide</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function Step5({ data }: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="h-6 w-6 text-[#1E6FD9]" />
        <h2 className="text-xl font-semibold text-slate-800">Final Summary</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase text-slate-400">Identity</h3>
          <div className="space-y-1">
            <p className="font-semibold">{data.business_name}</p>
            <p className="text-sm text-slate-600">{data.address}</p>
            <p className="text-sm text-slate-600">EIN: {data.ein}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase text-slate-400">Capacity</h3>
          <div className="space-y-1">
            <p className="text-sm text-slate-600">Max Contract: ${Number(data.max_contract_value).toLocaleString()}</p>
            <p className="text-sm text-slate-600">Max Concurrent Bids: {data.max_concurrent_bids}</p>
          </div>
        </div>

        <div className="space-y-4 col-span-full">
          <h3 className="font-bold text-sm uppercase text-slate-400">Match Profile</h3>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((c: string) => <Badge key={c} className="bg-purple-100 text-purple-700 hover:bg-purple-100">{c}</Badge>)}
            {data.cslb_classes.map((c: string) => <Badge key={c} className="bg-blue-100 text-blue-700 hover:bg-blue-100">Class {c}</Badge>)}
            <Badge variant="outline">{data.naics_codes.length} NAICS Codes</Badge>
            <Badge variant="outline">{data.counties_served.length} Counties</Badge>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-4">
        <CheckCircle2 className="h-6 w-6 text-[#1E6FD9] flex-shrink-0 mt-1" />
        <div className="space-y-1">
          <p className="font-medium text-blue-900">Ready to go!</p>
          <p className="text-sm text-blue-700">Once you complete the setup, BidIQ will start matching your business with open government contracts immediately.</p>
        </div>
      </div>
    </div>
  );
}
