import type { MouseEventHandler } from "react";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      color="primary"
      isLoading={pending}
      type="submit"
      onClick={handleClick}
    >
      Log In
    </Button>
  );
}
