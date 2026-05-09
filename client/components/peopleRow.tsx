import { deletePeople } from "@/app/people/actions";
import { IPeople } from "@/types/people-interfaces";
import { IPVersion } from "net";
import { SubmitButton } from "./submitButton";

export function PeopleRow({people}:{people: IPeople}){
 const deleteWithId = deletePeople.bind(null, String(people.id))
 
 return(
  <div className="flex items-center justify-between p-4 border-b">
    <div>
      <p className="font-bold">{people.name}</p>
      <p className="text-sm text-gray-500">About: {people.about}</p>
      <p className="text-sm text-gray-500">Gender: {people.gender}</p>
    </div>

    <form action={deleteWithId}>
      <SubmitButton text="Delete"/>
    </form>
  </div>
 )
}