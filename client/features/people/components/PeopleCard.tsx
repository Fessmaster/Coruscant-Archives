import { CardBox } from "@/components/ui/CardBox";

interface PersonCardProps {
  person: {
    id: string;
    name: string;
    height: string;
    mass: string;
    gender: string;
    imageUrl?: string;
  };
}

export function PersonCardProps({ person }: PersonCardProps){
  return (
    <CardBox imageUrl={person.imageUrl}>

      <div className="space-y-1">
        <span className="text-xs font-semibold text-yellow-500 uppercase tracking-widest block">
          Character Spec
        </span>
        <h3 className="text-lg font-bold text-white tracking-wide truncate group-hover:text-yellow-400 transition-colors">
          {person.name}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-neutral-800/60 pt-3 text-xs">
        <div>
          <span className="text-neutral-500 block uppercase tracking-wider font-medium text-[10px]">Height</span>
          <span className="text-neutral-200 font-mono">{person.height}</span>
        </div>
        <div>
          <span className="text-neutral-500 block uppercase tracking-wider font-medium text-[10px]">Mass</span>
          <span className="text-neutral-200 font-mono">{person.mass}</span>
        </div>
        <div>
          <span className="text-neutral-500 block uppercase tracking-wider font-medium text-[10px]">Gender</span>
          <span className="text-neutral-200 font-mono">{person.gender}</span>
        </div>
      </div>
    </CardBox>
  )
}