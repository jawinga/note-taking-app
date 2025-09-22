import { useMemo } from "react";
import { useNotes } from "@/app/context/NotesContext";

export function useTagCounts() {
  const { notes } = useNotes();

  return useMemo(() => {
    const map: Record<string, number> = {};

    notes.forEach((note) => {
      (note.tags ?? []).forEach((tag) => {
        map[tag.id] = (map[tag.id] ?? 0) + 1;
      });
    });

    return map;
  }, [notes]);
}
