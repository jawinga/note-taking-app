import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { colours } from "./colours";
import { TagItem } from "@/app/components/features/Noteform/Tag";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchColour = (slug: string) =>
  colours.find((c) => c.name.toLowerCase() === slug.toLowerCase())?.class ??
  "bg-gray-500";

export const addExistingTag = (tags: TagItem[], newTag: TagItem) => {
  return tags.some((t) => t.id === newTag.id) ? tags : [...tags, newTag];
};
