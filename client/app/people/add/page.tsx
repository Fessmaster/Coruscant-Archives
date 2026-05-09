"use client";
import { useActionState } from "react";
import { createPerson } from "./createPerson";
import { SubmitButton } from "../../../components/submitButton";

export default function AddPersonPage() {
  const [state, formAction] = useActionState(createPerson, null);

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
