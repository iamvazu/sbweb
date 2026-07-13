import { testimonials } from "@/lib/testimonials";
import { JsonLd } from "@/components/JsonLd";
import { Star } from "lucide-react";

export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <div className="hidden" aria-hidden="true">
        {/* OWNER_TO_FILL: Add testimonials to src/lib/testimonials.ts */}
      </div>
    );
  }

  const averageRating =
    testimonials.reduce((acc, curr) => acc + curr.rating, 0) /
    testimonials.length;

  const aggregateRatingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "STRONGERbuilt",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toString(),
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
    },
  };

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <JsonLd data={aggregateRatingJsonLd} />
        
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Small Businesses
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            See what our clients say about winning government contracts with STRONGERbuilt.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 bg-card text-card-foreground rounded-xl shadow-sm border"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4 text-amber-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
