import { Download, FileText } from "lucide-react";
import Link from "next/link";

interface LeadMagnetCardProps {
  title: string;
  description: string;
  downloadUrl: string;
}

export function LeadMagnetCard({ title, description, downloadUrl }: LeadMagnetCardProps) {
  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-lg text-primary">
        <FileText className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
      <Link 
        href={downloadUrl}
        className="inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary mt-2"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Free Guide
      </Link>
    </div>
  );
}
