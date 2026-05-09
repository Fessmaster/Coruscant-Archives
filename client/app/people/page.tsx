
import { PeopleRow } from "@/components/peopleRow";
import { getData } from "./getData";

export default async function PeoplePage() {
  const res = await getData();
  const people = res.data.result

  return (    
    <main>
      <h1>Person Archives</h1>
      <ul>
        {people.map((item) => (
          <PeopleRow key={item.id} people={item}/>
          ))}
      </ul>
    </main>
  );
}
