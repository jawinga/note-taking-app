import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTags } from "@/hooks/useTags";
import { useState } from "react";

const ExistingNotes = ({ onSelect }: { onSelect: (tagId: string) => void }) => {
  const [value, setValue] = useState("");
  const { tags } = useTags();

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        setValue(val);
        onSelect(val);
        setValue("");
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a tag"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {tags.map((t) => (
          <SelectItem key={t.id} value={t.id}>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: t.colour }}
              />
              {t.tag}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ExistingNotes;
