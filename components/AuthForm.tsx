"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, ChevronLeft, Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { parseStringify } from "@/lib/utils";
import LinkBank from "./LinkBank";
import {
  getLoggedInUser,
  SignInWithGithub,
  SignInWithGoogle,
  SignWithEmail,
} from "@/lib/actions/user.actions";

interface AuthFormProps {
  type: "signin" | "signup";
}
interface AuthUser {
  user: null;
  userId: string;
}
const AuthForm = ({ type }: AuthFormProps) => {
  const [authCred, setAuthCred] = useState<AuthEmailProps>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    type: type,
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState<
    "email" | "google" | "github" | null
  >(null);
  const router = useRouter();

  const authHandler = async () => {
    setLoading(true);

    try {
      if (authType === "email") {
        if (authCred.type === "signup") {
          const newUser = await SignWithEmail(authCred);
          if (newUser) {
            setUser(newUser);
            router.push("/");
          } else {
            router.push("/sign-in");
          }
        } else {
          const newUser = await SignWithEmail(authCred);
          if (!newUser) {
            setUser(newUser);
            router.push("/sign-up");
          } else {
            router.push("/");
          }
        }
      } else {
        if (authType === "google") {
          console.log("Trying signin with Authhandler");
          await SignInWithGoogle();
        } else {
          console.log("Trying signin with Authhandler");
          await SignInWithGithub();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/Logo.png"
            width={45}
            height={45}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-userGradient">
            FinLife
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24  lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "signin" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link Your Account to get started"
              : "Please choose a Method "}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <LinkBank userId={"123"} />
        </div>
      ) : (
        <>
          <CardContent>
            {/* NOTE: as AuthType is null , we let user Select Different Auth Method*/}
            {authType == null && (
              <div className="flex flex-col space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setAuthType("email");
                  }}
                  className="btn-base"
                >
                  <span className="btn-content">
                    <Mail className="mr-2" size={20} strokeWidth={2.5} />
                    Continue With Email
                  </span>
                  <span className="btn-gradient" />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setAuthType("google");
                  }}
                  variant="outline"
                  className="btn-base"
                >
                  <span className="btn-content">
                    <span className="text-[25px] mr-2"></span>
                    Continue with Google
                  </span>
                  <span className="btn-gradient" />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setAuthType("github");
                  }}
                  variant="outline"
                  className="btn-base "
                >
                  <span className="btn-content">
                    <Github className="mr-2" size={20} strokeWidth={2.5} />
                    Continue with GitHub
                  </span>
                  <span className="btn-gradient" />
                </Button>
              </div>
            )}

            {/*NOTE: Shows the Email Form If AuthType Email is Selected  */}

            {authType == "email" && (
              <div className="flex flex-col gap-4">
                {type === "signup" && (
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input
                        type="input"
                        id="firstname"
                        onChange={(e) =>
                          setAuthCred({
                            ...authCred,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="Enter Your FirstName"
                      />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        type="input"
                        id="lastname"
                        onChange={(e) =>
                          setAuthCred({
                            ...authCred,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                  </>
                )}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    onChange={(e) =>
                      setAuthCred({ ...authCred, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    onChange={(e) =>
                      setAuthCred({ ...authCred, password: e.target.value })
                    }
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            )}

            {/* NOTE: Showing the choosen AuthType if other than email*/}

            {(authType === "google" || authType === "github") && (
              <div className="flex  justify-center items-center">
                <p>
                  You`ve selected
                  <span className="text-userGradient m-2 text-24 font-semibold">
                    {authType.toUpperCase()}
                  </span>
                </p>
              </div>
            )}
          </CardContent>

          {/* NOTE: As AythType is Not Null , It shows Main Submit Button */}

          {authType != null && (
            <>
              <div className="flex flex-row gap-4">
                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="btn-base"
                    onClick={() => {
                      setAuthType(null);
                    }}
                  >
                    <span className="btn-content ">
                      <ChevronLeft className="mr-2" size={20} />
                      Back
                    </span>
                    <span className="btn-gradient" />
                  </Button>
                </CardFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  className="btn-base w-full mr-[20px]  font-semibold flex-grow ml-3"
                  onClick={authHandler}
                >
                  <span className="btn-content">
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Loading...
                      </>
                    ) : type === "signin" ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </span>
                  <span className="btn-gradient" />
                </Button>
              </div>
            </>
          )}
          <footer className="flex justify-center gap-1">
            <p className=" text-16 font-normal text-gray-600">
              {type === "signin"
                ? "Don't have an account ?"
                : "Already have an account ?"}
            </p>
            <Link
              href={type === "signin" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
