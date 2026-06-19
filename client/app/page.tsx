/* eslint-disable react/jsx-no-comment-textnodes */
import { PersonCardProps } from "@/features/people/components/PeopleCard";
import { getPeopleForMainPage } from "@/features/people/services";
import Link from "next/link";

export default async function HomePage() {
  const peopleData = await getPeopleForMainPage();
  return (
    <div className="space-y-12">
      {/* People section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
          <div className="flex item-center gap-2">
            <h2 className="text-lg font-bold tracking-wider uppercase text-white">
              People
            </h2>
            {/* get count of entity from DB */}
            <span className=" text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full font-medium">
              {peopleData.totalCount}
            </span>
          </div>
          <Link
          href={"/people"}
          className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >See All</Link>     
        </div>

        {/* Grid for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {peopleData.arrayOfEntities.map((person) => (
            <PersonCardProps key={person.id} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
}
