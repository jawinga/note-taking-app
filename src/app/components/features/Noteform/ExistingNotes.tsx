import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTags } from "@/app/context/TagsContext";

const ExistingNotes = ({ onSelect }: { onSelect: (tagId: string) => void }) => {
  const [value, setValue] = useState("");
  const { tags } = useTags();
  const hasTags = tags.length > 0;

  return (
    <Select
      disabled={!hasTags}
      value={value}
      onValueChange={(val) => {
        setValue(val);
        onSelect(val);
        setValue("");
      }}
    >
      <SelectTrigger
        className="w-56 px-4 py-3 border h-50 border-gray-300 rounded-lg shadow-sm text-gray-900
               placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
      >
        <SelectValue
          placeholder={hasTags ? "Select a tag" : "No tags created"}
        />
      </SelectTrigger>
      <SelectContent
        className="w-56 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-200 hover:border-gray-400"
      >
        {tags.map((t) => (
          <SelectItem
            key={t.id}
            value={t.id}
            className="flex items-center gap-2 px-2 py-1 hover:bg-blue-50 rounded-md cursor-pointer"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: t.colour }}
            />
            {t.tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ExistingNotes;
