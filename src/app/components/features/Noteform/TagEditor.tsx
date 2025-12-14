import React, { useState } from "react";
import ColourSelect from "./ColourSelect";
import TagList from "./TagList";
import { TagItem } from "./Tag";
import { Plus } from "lucide-react";

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
      <div className="flex items-center gap-5">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add tag"
          className="flex-1 px-4 py-2 border-0 bg-white rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd(e);
          }}
          aria-label="Tag text"
        />
        <ColourSelect value={tagColour} onChange={setTagColour} />
        <button
          type="button"
          className="p-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={handleAdd}
          aria-label="Add tag"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <TagList
        tags={tags}
        className="flex flex-row flex-wrap gap-2 my-4"
        onRemove={onRemove}
      />
    </div>
  );
};

export default TagEditor;
