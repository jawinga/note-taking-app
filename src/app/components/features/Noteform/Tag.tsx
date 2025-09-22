import React from "react";
import { searchColour } from "@/lib/utils";

export type TagItem = { id: string; tag: string; colour: string };

type Props = {
  item: TagItem;
  className?: string;
  onRemove?: () => void;
  count?: number;
};

const Tag = ({ item, className = "", onRemove, count }: Props) => {
  return (
    <span
      key={item.id}
      className={`px-3 py-1 cursor-default rounded-full text-sm text-white m-1 w-fit ${searchColour(
        item.colour
      )} ${className}`}
    >
      {item.tag}

      {typeof count === "number" && (
        <span className="ml-2 inline-flex items-center justify-center min-w-5 px-1.5 h-5 text-xs rounded-full bg-black/10 text-gray-800">
          {count}
        </span>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="ml-1 leading-none -mr-1 px-1 rounded hover:bg-white/20"
        aria-label={`Remove ${item.tag}`}
      >
        x
      </button>
    </span>
  );
};

export default Tag;
