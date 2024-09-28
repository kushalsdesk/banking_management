"use server";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);
  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    secure: true,
  });
  const response = NextResponse.redirect(`${request.nextUrl.origin}/`);
  return response;
};
