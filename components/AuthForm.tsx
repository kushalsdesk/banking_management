import React from "react";

interface AuthFormProps {
  type: String;
}
const AuthForm = ({ type }: AuthFormProps) => {
  return <div>{type}</div>;
};

export default AuthForm;
