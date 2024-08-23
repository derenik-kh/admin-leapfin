"use client";

import { Input, Checkbox } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";

import { login } from "@/actions/auth";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage.error);
    }
  }, [errorMessage]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">Log In</p>
        <form action={dispatch} className="flex flex-col gap-4">
          <Input
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <PasswordInput />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox defaultSelected name="remember" size="sm">
              Remember me
            </Checkbox>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
