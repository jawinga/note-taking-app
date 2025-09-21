"use client";
import React, { useMemo, useState } from "react";
import { useTags } from "@/app/context/TagsContext";
import TagList from "@/app/components/features/Noteform/TagList";
import Search from "@/app/components/ui/buttons/Search";

const TagsPage = () => {
  const { tags, removeTag } = useTags();
  const [query, setQuery] = useState("");

  const trimmedQuery = query.toLowerCase().trim();

  const list = useMemo(() => {
    if (!trimmedQuery) return tags;
    return tags.filter((t) => t.tag.toLowerCase().includes(trimmedQuery));
  }, [tags, trimmedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search tags"
      ></Search>

      {tags.length > 0 ? (
        <TagList
          tags={list}
          className="flex flex-row flex-wrap gap-2 mt-3"
          onRemove={removeTag}
        ></TagList>
      ) : (
        "No tags found"
      )}
    </div>
  );
};

export default TagsPage;
