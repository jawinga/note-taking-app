import React, { useState } from "react";
import ColourSelect from "./ColourSelect";
import TagList from "./TagList";
import { TagItem } from "./Tag";

type Props = {
  tags: TagItem[];
  onAdd: (tag: string, colour: string) => void;
  onRemove: (id: string) => void;
  className?: string;
};

const TagEditor = ({ tags, onAdd, onRemove, className }: Props) => {
  const [tagInput, setTagInput] = useState("");
  const [tagColour, setTagColour] = useState("");

  function handleAdd(e?: React.FormEvent | React.MouseEvent) {
    e?.preventDefault?.();
    const t = tagInput.trim();
    const c = tagColour.trim();
    if (!t || !c) return;
    onAdd(t, c);
    setTagInput("");
    setTagColour("");
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add 1 word tag"
          className="w-56 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900
                     placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd(e);
          }}
          aria-label="Tag text"
        />
        <ColourSelect value={tagColour} onChange={setTagColour} />
        <button
          className="w-auto rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white"
          onClick={handleAdd}
          aria-label="Add tag"
        >
          +
        </button>
      </div>

      <TagList
        tags={tags}
        className="flex flex-row flex-wrap gap-2 mt-3"
        onRemove={onRemove}
      />
    </div>
  );
};

export default TagEditor;
