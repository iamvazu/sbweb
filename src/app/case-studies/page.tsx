import { Metadata } from "next";
import { caseStudies } from "@/lib/caseStudies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Success Stories",
  description: "Read about how STRONGERbuilt has helped businesses win government RFPs and scale their operations.",
};

export default function CaseStudiesPage() {
  const publishedCaseStudies = caseStudies.filter((cs) => cs.published);

  return (
    <main className="flex-1 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-4 md:gap-8 mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Case Studies
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover how we've helped small businesses across the nation win government contracts through our Pay-When-You-Win model.
          </p>
        </div>

        {publishedCaseStudies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-lg border border-dashed">
            <h2 className="text-2xl font-semibold mb-2">Case Studies Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're currently compiling detailed reports of our most recent wins. Check back soon for in-depth success stories.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <div className="text-sm font-medium text-primary mb-2">
                    {cs.agency}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cs.clientType}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
