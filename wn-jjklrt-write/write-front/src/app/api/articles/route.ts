//Proxy Next

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://write-back:3002/api/articles", {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
