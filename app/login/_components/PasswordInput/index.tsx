"use client";
import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export function PasswordInput() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Input
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="solar:eye-closed-linear"
            />
          ) : (
            <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="solar:eye-bold"
            />
          )}
        </button>
      }
      label="Password"
      labelPlacement="outside"
      name="password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      variant="bordered"
    />
  );
}
