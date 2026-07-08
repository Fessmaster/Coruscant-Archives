import { getPeopleArray } from "@/features/people/services";

import { PersonCardProps } from "@/features/people/components/PeopleCard";
import { CategoryNav } from "@/components/CategoryNav";
import { PaginationArrows } from "@/components/ui/PaginationArrows";
import Link from "next/link";

interface PeoplePageProps {
  searchParams: Promise<{ page?: number }>;
}

export default async function PeoplePage({ searchParams }: PeoplePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const peopleData = await getPeopleArray(currentPage);
  

  return (
    <main>
      <CategoryNav activeCategory="people"/>
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
          <div className="flex item-center gap-2">
            <h2 className="text-lg font-bold tracking-wider uppercase text-white">
              People archives
            </h2>
            {/* get count of entity from DB */}
            <span className=" text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full font-medium">
              {peopleData.total}
            </span>
          </div>
        </div>

        {/* Grid for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {peopleData.arrayOfEntities.sort((a, b)=>a.id - b.id).map((person) => (
            <Link href={`/people/${person.id}`} key={person.id}>
              <PersonCardProps key={person.id} person={person} />
              </Link>
          ))}
          
        </div>
        
        <PaginationArrows 
        currentPage={currentPage}
        hasNextPage={peopleData.navigation.nextPage}
        hasPreviousPage={peopleData.navigation.previousPage} />
      </section>
    </main>
  );
}
