import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export function GET(
  request: Request,
  { params }: { params: { review_id: string; id: string } }
) {
  const { review_id, id } = params;

  console.log(review_id);
  const data: Record<string, any>[] = fetchData(
    "../data/reviews.json",
    "reviews"
  );
  const item = data.filter((review) => {
    return review.bookId === id;
  });

  const review = item.find((review) => review.id === review_id);
  if (!review) {
    return NextResponse.json({ response: "No data found" });
  }
  return NextResponse.json(review);
}
