import { ConnectedNodeData } from "@/types/ConnectedNodesData";
import { MiniEntityCard } from "./MiniEntityCard";

interface ConnectedNodesBlockProps {
  nodes: ConnectedNodeData[];
}

export const ConnectedNodesBlock: React.FC<ConnectedNodesBlockProps> = ({
  nodes,
}) => {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="w-full mt-8 border-t border-neutral-900 pt-8">
      <h4 className="text-[11px] font-bold tracking-widest uppercase text-neutral-600 mb-6 text-center">
        {" "}
        Linked Nexus Directory
      </h4>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl mx-auto px-4">
        {nodes.map((node) => (
          <MiniEntityCard key={node.type} node={node} />
        ))}
      </div>
    </div>
  );
};
