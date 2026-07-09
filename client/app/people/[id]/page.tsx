import { CategoryNav } from "@/components/CategoryNav";
import { AccordionGroup } from "@/components/ui/AccordionGroup";
import { ConnectedNodesBlock } from "@/components/ui/ConnectedNodesBlock";
import { EntityDescription } from "@/components/ui/EntityDescription";
import { EntityGallery } from "@/components/ui/EntityGallery";
import { EntitySpecsTable } from "@/components/ui/EntitySpecTable";
import { getPeopleByID } from "@/features/people/services";
import { da } from "zod/locales";

interface RoutParams {
  id: string
}

interface PeopleByIdProps {
  params: Promise<RoutParams>
}

export default async function PeopleById({ params }: PeopleByIdProps) {
  const { id } = await params
  //TODO Перевірка на валідність ІД і повернення 404 помилки
  const data = await getPeopleByID(Number(id));


  return (
    <main>
      <CategoryNav activeCategory="people" />
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
          <div className="flex item-center gap-2">
            <h2 className="text-2xl font-bold tracking-wider uppercase text-white">
              {data.name}
            </h2> 
          </div>
        </div>
        <EntityGallery name={data.name} mainImage={data.mainImage} gallery={data.images} metaFields={data.metaFields}/>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <EntityDescription title="Database Record: Historical Log" text={data.about} />
          </div>

          <div className="lg:col-span-1">
            <EntitySpecsTable title="Physical Specification" specs={data.table}/>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4 pl-2">
            Connected Database Nodes
          </h4>
          <AccordionGroup sections={data.personAccordions}/>
        </div>

        <div>
          <ConnectedNodesBlock nodes={data.connectedNodes}/>
        </div>
      </section>
    </main>
  );
}
