"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, OAuthProvider } from "node-appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "../utils";

export const SignOut = async () => {
  const { account } = await createSessionClient();

  cookies().delete("appwrite-session");
  await account.deleteSession("current");

  redirect("/sign-up");
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
};

export const SignWithEmail = async ({
  email,
  password,
  firstName,
  lastName,
  type,
}: AuthEmailProps) => {
  try {
    const { account } = await createAdminClient();
    let user;

    if (type === "signup") {
      user = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`,
      );
    }
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    if (type === "signup") {
      return parseStringify(user);
    } else {
      return parseStringify(session);
    }
  } catch (err) {
    console.log("Error while Signin with Email");
    console.log(err);
  }
};

export const SignInWithGithub = async () => {
  try {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Github,
      `${origin}/api/oauth`,
      `${origin}/sign-up`,
    );

    return redirect(redirectUrl);
  } catch (err) {
    console.log("Error while Signin with github");
    console.log(err);
  }
};

export const SignInWithGoogle = async () => {
  try {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${origin}/api/oauth`,
      `${origin}/sign-up`,
    );

    return redirect(redirectUrl);
  } catch (err) {
    console.log("Error while signin with google");
    console.log(err);
  }
};
