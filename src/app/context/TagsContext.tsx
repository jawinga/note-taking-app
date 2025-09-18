"use client";
import React, {
  ReactNode,
  useState,
  Provider,
  createContext,
  useReducer,
  useEffect,
  useMemo,
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
  setTags: React.Dispatch<React.SetStateAction<TagItem[]>>;
  addTag: (note: TagItem) => void;
  selectedTagDelete: TagItem | null;
  setSelectedTagDelete: React.Dispatch<React.SetStateAction<TagItem | null>>;
  deleteTag: (note: TagItem) => void;
}

export const TagsContext = createContext<TagsContextType | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.tags.some(
        (t) => t.tag.toLowerCase() === action.tag.tag.toLowerCase()
      );

      if (exists) return;
      return {
        ...state,
        tags: [...state.tags, action.tag],
      };
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
      return { ...state, selectedTagElement: action.tag };

    case "HYDRATE": {
      return { ...state, tags: action.tags };
    }
    default:
      return;
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
        dispatch({ type: "HYDRATE", tags: JSON.parse(raw) as TagItem[] });
      } catch {}
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(state.tags));
  }, [state.tags]);

  const addTag = (tag: string, colour: string) => {
    const clean = tag.trim();
    const cleanColour = colour.trim();
    if (!/^[^\s]+$/.test(clean)) return;
    if (!cleanColour) return;
    dispatch({
      type: "ADD",
      tag: { id: crypto.randomUUID(), tag: clean, colour: cleanColour },
    });
  };

  const removeTag = (id: string) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  };

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
