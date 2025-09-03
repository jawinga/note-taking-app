import React from "react";
import { colours } from "@/lib/colours";

export type TagItem = { id: string; tag: string; colour: string };

const searchColour = (slug: string) =>
  colours.find((c) => c.name.toLowerCase() === slug.toLowerCase())?.class ??
  "bg-gray-500";

type Props = {
  item: TagItem;
  className?: string;
  onRemove?: () => void;
};

const Tag = ({ item, className = "", onRemove }: Props) => {
  return (
    <span
      key={item.id}
      className={`px-3 py-1 rounded-full text-sm text-white m-1 w-fit ${searchColour(
        item.colour
      )} ${className}`}
    >
      {item.tag}
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
