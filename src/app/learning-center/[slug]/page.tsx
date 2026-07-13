import { ALL_ARTICLES } from "@/lib/data/learning-center";
import ArticleDetailClient from "./client";
import { Metadata } from "next";

export function generateStaticParams() {
  return ALL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ALL_ARTICLES.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) {
    return {
      title: "Guide Not Found",
    };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ArticleDetailClient slug={resolvedParams.slug} />;
}
