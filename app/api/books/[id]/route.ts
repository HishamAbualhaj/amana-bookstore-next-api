import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data: Record<string, any>[] = fetchData("../data/books.json", "books");
  const item = data.find((book) => {
    return book.id === id;
  });

  if (!item) {
    return NextResponse.json({ response: "No data found" });
  }

  return NextResponse.json(item);
}
