"use server";

import { auth } from "@/app/auth";
import { CreatePersonSchema } from "../../../schema/create.Person.Schema";

export async function createPerson(prevState: unknown, formData: FormData) {
  await new Promise((res) => setTimeout(res, 2000)); //FIXME Delete promise

  const rawData = Object.fromEntries(formData.entries());

  const validateData = CreatePersonSchema.safeParse(rawData);

  const session = await auth();

  if (!validateData.success){
    return {
      success: false,
      message: 'Validation error',
      error: validateData.error.flatten().fieldErrors
    }
  }

  try {
    const dataObj = validateData.data;

    const response = await fetch("http://localhost:3030/people", {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${session?.user.accessToken}`

      },
    });

    if (!response.ok) {
      throw new Error("DB error");
    }

    return { message: "Data saved in DB", success: true };
  } catch (error) {
    return { message: `Failed to save data, ${error}`, success: false };
  }
}
