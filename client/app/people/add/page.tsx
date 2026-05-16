"use client";
import { useActionState, useEffect } from "react";
import { createPerson } from "./createPerson";
import { SubmitButton } from "../../../components/submitButton";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ro } from "zod/locales";

export default function AddPersonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const result = await createPerson(prevState, formData);

      if (result?.needReauth) {
        await signOut({ redirect: false });
        router.push("/login");
        return result;
      }

      return result;
    },
    null,
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  if (status==='loading'||status==="unauthenticated"){
    return(
      <div>Завантаження...</div>
    )
  }

  return (
    <main>
      <form action={formAction}>
        <input type="text" name="name" placeholder="Type name of new person" />
        <br />
        <input type="text" name="about" placeholder="About" /> <br />
        <input type="text" name="height" placeholder="Height" />
        {state?.error?.height && (
          <span className="text-red-500">{state.error.height[0]}</span>
        )}
        <br />
        <input type="text" name="mass" placeholder="Mass" />
        {state?.error?.mass && (
          <span className="text-red-500">{state.error.mass[0]}</span>
        )}
        <br />
        <input type="text" name="hair_color" placeholder="Hair color" />
        <br />
        <input type="text" name="skin_color" placeholder="Skin color" />
        <br />
        <input type="text" name="eye_color" placeholder="Eye color" />
        <br />
        <input type="text" name="birth_year" placeholder="Birth year" />
        <br />
        <input type="text" name="gender" placeholder="Gender" />
        {state?.error?.gender && (
          <span className="text-red-500">{state.error.gender[0]}</span>
        )}{" "}
        <br />
        <SubmitButton />
        {state?.message && (
          <p style={{ color: state.success ? "green" : "red" }}>
            {state.message}
          </p>
        )}
      </form>
    </main>
  );
}
