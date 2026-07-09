import { ConnectedNodeData } from "@/types/ConnectedNodesData";
import Link from "next/link";

interface MiniEntityCardProps {
  node: ConnectedNodeData;
}

export const MiniEntityCard: React.FC<MiniEntityCardProps> = ({ node }) => {
  const { categoryTitle, entityTitle, imageUrl, url } = node;
  return (
    <Link
      href={url}
      className="group block w-[11rem] h-[16rem] bg-neutral-900/30 border-neutral-800/80 hover:border-yellow-500/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className="absolute inset-0 overflow-hidden bg-neutral-950 relative border-b border-neutral-800/40 z-0">
        <img
          src={imageUrl}
          alt={entityTitle}
          className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent z-10" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-center bg-neutral-950/50 backdrop-blur-md border-t border-neutral-800/30 z-20">
        <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-medium truncate mb-1">
          {categoryTitle}
        </span>
        <span className="text-xs font-bold tracking-wide text-neutral-200 font-mono group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2">
          {entityTitle}
        </span>
      </div>
    </Link>
  );
};
