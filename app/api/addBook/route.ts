import { NextResponse } from "next/server";
import writeFile from "@/app/utils/writeFile.js";
export async function POST(request: Request) {
  const newBook = await request.json();
  const id = Math.ceil(Math.random() * 1000);

  try {
    writeFile({ id: String(id), ...newBook }, "books");

    return NextResponse.json({
      message: "Book added successfully!",
      book: newBook,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error while adding new book",
    });
  }
}
