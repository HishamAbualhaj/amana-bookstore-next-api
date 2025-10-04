import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const data: Record<string, any>[] = fetchData(
    "../data/reviews.json",
    "reviews"
  );
  const item = data.filter((review) => {
    return review.bookId === id;
  });

  return NextResponse.json(item);
}
