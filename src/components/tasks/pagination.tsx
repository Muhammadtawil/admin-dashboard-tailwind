import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ totalPages, activePage, onPageChange }:{ totalPages:any, activePage:any, onPageChange:any }) {
  const next = () => {
    if (activePage < totalPages) {
      onPageChange(activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-1 text-graydark dark:text-white text-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <IconButton
            key={index + 1}
            variant={activePage === index + 1 ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(index + 1)}
            className="rounded-full border dark:border-white bg-black"
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePage === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
