import Link from "next/link";

interface PaginationArrowsProps {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function PaginationArrows({
  currentPage,
  hasPreviousPage,
  hasNextPage,
}: PaginationArrowsProps) {
  return (
    <div className="flex justify-center items-center gap-6 font-mono text-lg pt-6 select-none">
      {hasPreviousPage ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="hover:scale-105 transition-transform"
        >
          <img
            src="img/active_arrow_back.png"
            alt="Prev"
            className="w-10 h-auto"
          />
        </Link>
      ) : (
        <img
          src="img/disable_arrow_back.png"
          alt="Prev Disable"
          className="w-10 h-auto opacity-30 cursor-not-allowed"
        />
      )}

      <span className="text-neutral-500  text-sm">
        Sector <span className="text-orange-500 font-bold">{currentPage}</span>
      </span>

      {hasNextPage ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="hover:scale-105 transition-transform"
        >
          <img
            src="img/active_arrow_forward.png"
            alt="Next"
            className="w-10 h-auto"
          />
        </Link>
      ) : (
        <img
          src="img/disable_arrow_forward.png"
          alt="Next Disable"
          className="w-10 h-auto opacity-30 cursor-not-allowed"
        />
      )}
    </div>
  );
}
