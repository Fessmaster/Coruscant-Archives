'use client'
interface SpecItem {
  label: string;
  value?: string | number | null;
}


interface EntitySpecsTableProps {
  title: string;
  specs: SpecItem[];
}

export const EntitySpecsTable: React.FC<EntitySpecsTableProps> = ({title, specs}) => {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-6 backdrop-blur-sm h-full">
      <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-6">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {specs.map((spec, index)=>(
          <div
          key={index}
          className="flex justify-between items-center border-b border-neutral-800/40 pb-3 last:border-none last:pb-0"
          >
            <span className="text-xs  tracking-wider uppercase text-neutral-500 font-medium">
              {spec.label}
            </span>

            <span className="text-sm font-mono font-medium text-neutral-200 text-right">
              {spec.value || 'Unknown'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}