import { Metadata } from "next";

export const metadata: Metadata = {
  title: "10-Point RFP Compliance Checklist | STRONGERbuilt",
  description: "Don't get disqualified before they read your price. Download our free 10-point RFP compliance checklist.",
};

export default function RfpChecklistPage() {
  return (
    <main className="flex-1 py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4">
            10-Point RFP Compliance Checklist
          </h1>
          <p className="text-lg text-muted-foreground">
            Get the checklist our proposal managers use to ensure zero-defect submissions.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Where should we send your checklist?</h2>
          <form className="space-y-4" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Work Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                required
                className="w-full flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Send Me the Checklist
            </button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              We'll never share your email. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
