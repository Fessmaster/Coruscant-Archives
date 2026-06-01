import { PersonCardProps } from "@/features/people/components/PeopleCard";

export default function HomePage() {

  const peopleMock = [
    {id:'1', name: 'Luck Skywalker', height:'172', mass: '77', gender:'male'},
    {id:'2', name: 'C-3PO', height:'167', mass: '76', gender:'n/a'},
    {id:'3', name: 'Darth Vader', height:'201', mass: '136', gender:'male'},
    {id:'4', name: 'Obi-Wan Kenobi', height:'182', mass: '77', gender:'male'},
  ]
  return (
    <div className="space-y-12">

      {/* People section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
          <div className="flex item-center gap-2">
            <h2 className="text-lg font-bold tracking-wider uppercase text-white">People</h2>
            {/* get count of entity from DB */}
            <span className=" text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full font-medium">
              82
            </span>
          </div>
          <a href="#" className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors">See All</a>
        </div>
        
        {/* Grid for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {peopleMock.map(person => (
            <PersonCardProps key={person.id} person={person}/>
          ))}
        </div>
      </section>
    </div>    
  );
}
