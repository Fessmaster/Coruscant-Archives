"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({text = 'Save'}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Wait..." : text}
    </button>
  );
}
