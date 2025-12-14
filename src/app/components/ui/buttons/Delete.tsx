import React, { useContext } from "react";
import { Trash2 } from "lucide-react";
import { Note } from "@/app/models/Note";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { NotesContext } from "@/app/context/NotesContext";

interface DeleteProps {
  note: Note;
}

const Delete = ({ note }: DeleteProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const { deleteNote } = useContext(NotesContext)!;

  return (
    <>
      <div>
        <Trash2
          className="text-blue-900 w-5 h-5 hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        />
      </div>

      {openModal && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                      Delete Note
                    </DialogTitle>
                    <p className="text-sm text-gray-600">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-2">
                  Are you sure you want to delete this note?
                </p>
                <p className="text-sm text-gray-500">
                  This will permanently remove the note and all its content.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("DELETING:", note.id);
                    deleteNote(note);
                    setOpenModal(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Note
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Delete;
