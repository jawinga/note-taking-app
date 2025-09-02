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
  placeholder = "Select colour",
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={
          className ??
          "w-60 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 " +
            "placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 " +
            "focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
        }
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg shadow-sm 
               text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 
               hover:border-gray-400"
      >
        {colours.map((c) => (
          <SelectItem key={c.name} value={c.name.toLowerCase()}>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${c.class}`} />
              {c.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ColourSelect;
