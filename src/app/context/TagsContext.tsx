"use client";
import React, {
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { TagItem } from "../components/features/Noteform/Tag";

type State = { tags: TagItem[]; selectedTagDelete: TagItem | null };
type Action =
  | { type: "ADD"; tag: TagItem }
  | { type: "REMOVE"; id: string }
  | { type: "SELECT_DELETE"; tag: TagItem | null }
  | { type: "HYDRATE"; tags: TagItem[] };

interface TagsContextType {
  tags: TagItem[];
  addTag: (item: TagItem) => void;
  removeTag: (id: string) => void;
  selectedTagDelete: TagItem | null;
  setSelectedTagDelete: (tag: TagItem | null) => void;
}

export const TagsContext = createContext<TagsContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const exists = state.tags.some(
        (t) => t.tag.toLowerCase() === action.tag.tag.toLowerCase()
      );
      if (exists) return state; // keep state unchanged
      return { ...state, tags: [...state.tags, action.tag] };
    }
    case "REMOVE": {
      const tags = state.tags.filter((t) => t.id !== action.id);
      const selected =
        state.selectedTagDelete && state.selectedTagDelete.id === action.id
          ? null
          : state.selectedTagDelete;
      return { ...state, tags, selectedTagDelete: selected };
    }
    case "SELECT_DELETE":
      return { ...state, selectedTagDelete: action.tag };
    case "HYDRATE":
      return { ...state, tags: action.tags };
    default:
      return state;
  }
}

export function TagsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    tags: [],
    selectedTagDelete: null,
  });

  useEffect(() => {
    const raw = localStorage.getItem("tags");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TagItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", tags: parsed });
        }
      } catch {}
    }
  }, []);

  // persist on changes
  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(state.tags));
  }, [state.tags]);

  const addTag = (item: TagItem) => {
    const cleanTag = item.tag.trim();
    const cleanColour = item.colour.trim();
    if (!cleanTag) return;
    if (!cleanColour) return;
    dispatch({
      type: "ADD",
      tag: { ...item, tag: cleanTag, colour: cleanColour },
    });
  };

  const removeTag = (id: string) => dispatch({ type: "REMOVE", id });
  const setSelectedTagDelete = (tag: TagItem | null) =>
    dispatch({ type: "SELECT_DELETE", tag });

  const value = useMemo<TagsContextType>(
    () => ({
      tags: state.tags,
      addTag,
      removeTag,
      selectedTagDelete: state.selectedTagDelete,
      setSelectedTagDelete,
    }),
    [state.tags, state.selectedTagDelete]
  );

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}

// Typed consumer hook
export function useTags() {
  const ctx = useContext(TagsContext);
  if (!ctx) throw new Error("useTags must be used within a TagsProvider");
  return ctx;
}
