"use server";

import { UpdatePersonSchema } from "@/schema/update.Person.Scheme";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePeople(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries()); 

  const validateData = UpdatePersonSchema.safeParse(rawData);
  
  if (!validateData.success) {
    return { error: validateData.error.flatten().fieldErrors };
  }

  const response = await fetch(`http://localhost:3030/people/${String(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validateData.data),
    next: {tags: ['people-list', `people-${id}`]}
  });

  if (response.ok) {
    revalidateTag('people-list', 'max')
    revalidateTag(`people-${id}`, 'max')

    redirect("/people");
  }
}
