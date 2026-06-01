import { EditPeopleForm } from "@/components/editPersonForm";
import { getPersonById } from "@/lib/get-by-id";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getPersonById(id);

  const people = response.data;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Edit: {people.name}</h1>

      <EditPeopleForm people={people}/>
    </main>
  )
}
