import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export async function GET() {
  const data: Record<string, any>[] = fetchData("../data/books.json", "books");
  const toprated = data
    .map((book) => ({
      ...book,
      score: book.rating * book.reviewCount,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json(toprated);
}
