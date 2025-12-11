// src/hooks/useTags.ts
import { useState } from "react";
import { TagItem } from "@/app/components/features/Noteform/Tag";

type Options = { initial?: TagItem[] };

export function useTags(opts: Options = {}) {
  const [tags, setTags] = useState<TagItem[]>(opts.initial ?? []);

  const has = (id: string) => tags.some((t) => t.id === id);

  function addTag(text: string, colour: string) {
    const tag = text.trim();
    const col = colour.trim();
    if (!tag || !col) return;
    setTags((prev) => [...prev, { id: crypto.randomUUID(), tag, colour: col }]);
  }

  function removeTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  function reset() {
    setTags([]);
  }

  return { tags, setTags, addTag, removeTag, reset, has };
}
