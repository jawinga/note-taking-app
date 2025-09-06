import React from "react";
import { ScanSearch } from "lucide-react";
import { useDebounceSearch } from "@/hooks/debounceSearch";

type Props = {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  delay?: number;
};

const Search = ({
  value = "",
  onChange,
  placeholder = "Search notes",
  className = "",
  delay = 300,
}: Props) => {
  const [raw, setRaw] = React.useState(value);

  React.useEffect(() => {
    setRaw(value);
  }, [value]);

  const debounced = useDebounceSearch(raw, delay);

  React.useEffect(() => {
    onChange(debounced.trim());
  }, [debounced, onChange]);

  return (
    <div className={`relative ${className} flex flex-row`}>
      <ScanSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900
                   placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
        aria-label="Search notes"
      />
    </div>
  );
};

export default Search;
