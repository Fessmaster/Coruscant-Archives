"use client";

import { IPeople } from "@/types/people-interfaces";
import { useActionState } from "react";
import { SubmitButton } from "./submitButton";
import { updatePeople } from "@/lib/actions";
import React from "react";

export function EditPeopleForm({ people }: { people: IPeople }) {
  const updatePeopleWithId = updatePeople.bind(null, String(people.id));
  const [state, formAction] = useActionState(updatePeopleWithId, null);

  
  return (
    <form action={formAction} className="space-y-4">
      {
        <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
          {Object.entries(people)
            .filter(
              ([key]) =>
                key !== "id" &&
                key !== "images" &&
                key !== "createDate" &&
                key !== "updateDate" &&
                key !== "external_id" &&
                key !== "deleteAt",
            )
            .map(([key, val]) => (
              <React.Fragment key={key}>
                <label className="text-right font-medium capitalize">
                  {key}:
                </label>
                <input
                  name={key}
                  defaultValue={
                    key === "homeworld"
                      ? val?.id
                      : Array.isArray(val)
                        ? val.map((item) => item.id || item).join(", ")
                        : val
                  }
                  className="border-2 p-1 rounded w-full"
                />
              </React.Fragment>
            ))}
        </div>
      }
      <SubmitButton text="Update" />
    </form>
  );
}
