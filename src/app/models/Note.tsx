import { TagItem } from "../components/features/Noteform/Tag";
import { Prisma } from "../../../app-old/generated/prisma/client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PrismaNote = Prisma.NoteGetPayload<{
  include: {
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type Note = {
  id: string;
  title: string;
  content: string;
  created: Date;
  favourite?: boolean;
  tags: TagItem[];
};

//responses

export interface GetNotesResponse {
  notes: PrismaNote[];
}

export interface CreateNoteResponse {
  note: PrismaNote;
}

export interface UpdateNoteResponse {
  note: PrismaNote;
}

export interface DeleteNoteResponse {
  message: string;
}

//requests

export interface GetNoteRequest {
  id: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  favourite?: boolean;
  tags?: TagItem[];
}
export interface UpdateNoteRequest {
  noteId: string;
  title?: string;
  content?: string;
  favourite?: boolean;
  tags?: TagItem[];
}

export interface DeleteNoteRequest {
  id: string;
}
