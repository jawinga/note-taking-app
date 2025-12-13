import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colours } from "@/lib/colours";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const ColourSelect: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Colour",
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={
          className ??
          "w-auto px-4 py-2 border-0 bg-white rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        }
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
        {colours.map((c) => (
          <SelectItem
            key={c.name}
            value={c.name.toLowerCase()}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${c.class}`} />
              <span className="text-gray-700">{c.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ColourSelect;
