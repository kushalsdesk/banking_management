"use server";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { parseStringify } from "../utils";

export const signUp = async (data: SignUpParams) => {
  const { email, password } = data;
  try {
    if (email && password) {
      const session = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = parseStringify(session.user);
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

export const signUpGoogle = async (data: SignUpParams) => {
  const provider = new GoogleAuthProvider();
  try {
    const session = await signInWithPopup(auth, provider);
    console.log("User is signedUp with Google");
    const user = parseStringify(session.user);
    return user;
  } catch (err) {
    console.log(err);
  }
};
export const signUpGithub = async (data: SignUpParams) => {
  const provider = new GithubAuthProvider();
  try {
    const session = await signInWithPopup(auth, provider);
    console.log("User signed up with Github");
    const user = parseStringify(session.user);
    return user;
  } catch (err) {
    console.log(err);
  }
};
