import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data: Record<string, any>[] = fetchData("books");
  const item = data.find((book) => {
    return book.id === id;
  });

  if (!item) {
    return NextResponse.json({ response: "No data found" });
  }

  return NextResponse.json(item);
}
