import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ,  res: NextResponse) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await req.json();

    const {job} = body;





  return NextResponse.json(body);
}
