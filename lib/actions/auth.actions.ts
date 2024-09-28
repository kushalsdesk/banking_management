import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { parseStringify } from "../utils";

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredentials.user.uid;
  } catch (err) {
    console.log(err);
  }
};
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredentials.user.uid;
  } catch (error) {}
};

export const signWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    console.log("User is signedUp with Google");
    return userCredentials.user.uid;
  } catch (err) {
    console.log(err);
  }
};
export const signWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    console.log("User signed up with Github");
    return userCredentials.user.uid;
  } catch (err) {
    console.log(err);
  }
};
export const getLoggedInUser = async () => {
  try {
    const user = auth.currentUser;
    return user;
  } catch (err) {
    console.log(err);
  }
};
