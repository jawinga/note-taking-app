import { TagItem } from "../components/features/Noteform/Tag";

export type Note = {
  id: string;
  title: string;
  content: string;
  created: Date;
  favourite?: boolean;
  tags: TagItem[];
};
