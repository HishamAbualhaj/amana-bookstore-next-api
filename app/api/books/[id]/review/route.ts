import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const data: Record<string, any>[] = fetchData(
    "../data/reviews.json",
    "reviews"
  );
  const item = data.filter((review) => {
    return review.bookId === id;
  });

  return NextResponse.json(item);
}
