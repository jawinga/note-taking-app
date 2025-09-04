import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { colours } from "./colours";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchColour = (slug: string) =>
  colours.find((c) => c.name.toLowerCase() === slug.toLowerCase())?.class ??
  "bg-gray-500";
