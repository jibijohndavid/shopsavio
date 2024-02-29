import React from "react";

export function TextInput({ register, name, ...rest }: any) {
  return <input {...register(name)} {...rest} />;
}
