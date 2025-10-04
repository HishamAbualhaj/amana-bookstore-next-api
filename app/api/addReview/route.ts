import { NextResponse } from "next/server";
import writeFile from "@/app/utils/writeFile.js";
export async function POST(request: Request) {
  const newReview = await request.json();
  const id = Math.ceil(Math.random() * 1000);

  try {
    writeFile(
      { id: String(id), ...newReview },
      "../data/reviews.json",
      "reviews"
    );
    return NextResponse.json({
      message: "Review added successfully!",
      review: newReview,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error while adding new review",
    });
  }
}
