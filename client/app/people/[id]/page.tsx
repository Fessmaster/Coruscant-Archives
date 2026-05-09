import { getOnePerson } from "./getData";

export default async function PeoplePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await getOnePerson(id);

  if(res.statusCode!==200){
    throw new Error(`Person with id:${id} not found`)
  }

  const person = res.data;

  return (
    <main>
      <h1>Information about person {person.name}</h1>
      <h2>Name: {person.name}</h2>
      <h2>Gender: {person.gender}</h2>
      <h2>Height: {person.height}</h2>
    </main>
  );
}
