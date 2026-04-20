"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Handle subcontractor/partner application submission
 */
export async function submitPartnerApplication(formData: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("partner_applications")
    .insert([{
      company_name: formData.companyName,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      trade_categories: formData.trades || [],
      cslb_license: formData.cslb,
      certifications: formData.certifications || [],
      insurance_on_file: formData.hasInsurance === 'yes',
      dir_number: formData.dirNumber,
      coverage_area: formData.counties || [],
      years_in_business: parseInt(formData.years) || 0,
      status: 'pending'
    }]);

  if (error) {
    console.error("Partner Application Error:", error);
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Update application status (Admin Only)
 */
export async function updateApplicationStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic admin check
  if (!user?.email?.endsWith('@strongerbuilt.us') && user?.email !== 'roy@strongerbuilt.us' && user?.email !== 'crazyme2207@gmail.com') {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("partner_applications")
    .update({ status })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/portal/admin");
  return { success: true };
}
