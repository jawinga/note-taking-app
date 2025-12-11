import { GetNotesResponse, Note, PrismaNote } from "@/app/models/Note";
import {
  UpdateNoteRequest,
  CreateNoteRequest,
  UpdateNoteResponse,
  CreateNoteResponse,
} from "@/app/models/Note";
import { TagItem } from "@/app/components/features/Noteform/Tag";
const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export class NotesService {
  // Transform PrismaNote to Note
  private static adaptNotes(notedb: PrismaNote): Note {
    return {
      id: notedb.id,
      title: notedb.title,
      content: notedb.content,
      created: new Date(notedb.createdAt),
      favourite: notedb.favourite,
      tags: notedb.tags.map((t) => ({
        id: t.tag.id,
        tag: t.tag.tag,
        colour: t.tag.colour,
      })),
    };
  }

  // GET all notes
  static async getAllNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`/api/notes`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data: GetNotesResponse = await response.json();

      return data.notes.map(this.adaptNotes) || [];
    } catch (error) {
      console.error("Error fetching notes:", error);
      return [];
    }
  }

  static async getAllTags(): Promise<TagItem[]> {
    try {
      const response = await fetch(`/api/tags`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }

      const data: { tags: TagItem[] } = await response.json();

      return data.tags || [];
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  }

  // POST create note
  static async createNote(note: CreateNoteRequest): Promise<Note | null> {
    try {
      const response = await fetch(`/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const data: CreateNoteResponse = await response.json();
      return this.adaptNotes(data.note);
    } catch (error) {
      console.error("Error creating note:", error);
      return null;
    }
  }

  // PUT update note
  static async updateNote(updates: UpdateNoteRequest): Promise<Note | null> {
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const data: UpdateNoteResponse = await response.json();
      return this.adaptNotes(data.note);
    } catch (error) {
      console.error("Error updating note:", error);
      return null;
    }
  }

  // DELETE note
  static async deleteNote(noteId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  }
}
