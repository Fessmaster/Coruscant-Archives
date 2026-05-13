"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter()
  const { update } = useSession()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log(`+++++++++++++++++++++++++++++++ Username ${formData.get("username")}, PASS ${formData.get("password")}`);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result && result.ok) {
      await update()
      router.push("/people");
    } else {
      setError(result?.error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="flex flex-col">
        <input
          type="text"
          name="username"
          placeholder="login"
          className="my-4 w-40 flex-1 text-center bg-sky-500/50 border-4 border-indigo-500"
        />
        <input
          type="password"
          name="password"
          placeholder="passwords"
          className="my-4 w-40 flex-1 text-center bg-sky-500/50 border-4 border-indigo-500"
        />
      </div>
      <button type="submit">Увійти</button>
      {/* <LoginBtn /> */}
    </form>
  );
}
