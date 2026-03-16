//Proxy Next

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://read-back:3001/api/articles", {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
