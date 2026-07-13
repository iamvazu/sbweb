import { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/caseStudies";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy || !caseStudy.published) {
    return {};
  }
  return {
    title: `${caseStudy.title} | STRONGERbuilt Case Study`,
    description: `Learn how STRONGERbuilt helped ${caseStudy.clientType} secure the ${caseStudy.agency} contract.`,
  };
}

export function generateStaticParams() {
  return caseStudies.filter((cs) => cs.published).map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy || !caseStudy.published) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    author: {
      "@type": "Organization",
      name: "STRONGERbuilt",
    },
    publisher: {
      "@type": "Organization",
      name: "STRONGERbuilt",
      logo: {
        "@type": "ImageObject",
        url: "https://www.strongerbuilt.us/og-default.png",
      },
    },
  };

  const reviewJsonLd = caseStudy.quote
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          name: "STRONGERbuilt",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Client",
        },
        reviewBody: caseStudy.quote,
      }
    : null;

  return (
    <main className="flex-1 py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <JsonLd data={articleJsonLd} />
        {reviewJsonLd && <JsonLd data={reviewJsonLd} />}
        
        <Link
          href="/case-studies"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Studies
        </Link>

        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
          <div className="mb-8">
            <p className="text-primary font-semibold mb-2">{caseStudy.agency}</p>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {caseStudy.clientType}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 p-8 bg-muted rounded-xl">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Contract Value
              </h3>
              <p className="text-2xl font-bold">{caseStudy.contractValue}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Outcome
              </h3>
              <p className="text-2xl font-bold">{caseStudy.outcome}</p>
            </div>
          </div>

          {caseStudy.quote && (
            <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl text-muted-foreground">
              "{caseStudy.quote}"
            </blockquote>
          )}

          <div className="mt-12 pt-8 border-t">
            <p className="text-muted-foreground text-sm">
              Note: This is a placeholder section. Add full case study details and narrative here.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
