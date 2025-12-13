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
      <SelectTrigger className="w-full px-4 py-2 border-0 bg-white rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <SelectValue
          placeholder={
            hasTags ? "Or select existing tag" : "No tags created yet"
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
        {tags.map((t) => (
          <SelectItem
            key={t.id}
            value={t.id}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: t.colour }}
            />
            <span className="text-gray-700">{t.tag}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ExistingNotes;
