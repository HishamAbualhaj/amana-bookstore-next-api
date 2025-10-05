import { NextResponse } from "next/server";
import fetchData from "@/app/utils/fetchData.js";
export async function GET(request: Request) {
  try {
    let response: Record<string, any>[] = [];
    let isAll = true;
    const data = fetchData("books");

    const { searchParams } = new URL(request.url);
    let startDate = searchParams.get("startDate");
    let endDate = searchParams.get("endDate");
    let isFeatured = searchParams.get("isFeatured");

    // date is provided then fetch based on it
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 500 }
        );
      }
      if (start > end) {
        return NextResponse.json(
          { error: "Start date must be before end date" },
          { status: 500 }
        );
      }
      isAll = false;
      const items = searchForDate(data, start, end);
      response = [...items];
    }
    // if there's a isFeatured query
    if (isFeatured !== null) {
      isAll = false;
      if (isFeatured === "false") {
        isFeatured = null;
      }
      const items = searchFeatured(data, isFeatured);
      response = [...response, ...items];
    }
    // no search query then fetch all books.
    if (!isAll) {
      return NextResponse.json(response);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      response: "Error while fetching from file",
      error,
    });
  }
}

function searchForDate(arr: Record<string, any>[], start: Date, end: Date) {
  const items = arr.filter((book) => {
    const bookDate = new Date(book.datePublished);
    return bookDate >= start && bookDate <= end;
  });
  return items;
}
function searchFeatured(arr: Record<string, any>[], isFeatured: null | string) {
  const items = arr.filter((book) => {
    return book.featured === isFeatured;
  });

  return items;
}
