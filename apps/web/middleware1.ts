/* import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/lib/authOptions";

export interface CustomNextRequest extends NextRequest {
  userId: string;
}

const {auth} = NextAuth(authOptions);

export async function middleware(req: CustomNextRequest) {
  
  const session = await auth();
  console.log(session);

  if (!session?.user) {
    return NextResponse.json({
      error: "Unauthorized Request"
    }, {
      status: 401
    });
  }

  req.userId = session.user.id;

  NextResponse.next();
}

export const config = {
  matcher: "/api/v1/:path*"
}; */