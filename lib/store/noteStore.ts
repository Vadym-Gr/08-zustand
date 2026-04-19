import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNoteDto } from "@/types/note";

interface NoteState {
  draft: CreateNoteDto;
  setDraft: (note: CreateNoteDto) => void; // Оновлює весь об'єкт
  clearDraft: () => void;
}

const initialDraft: CreateNoteDto = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);




/*import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateNoteDto } from '@/types/note';

interface NoteState {
  draft: CreateNoteDto;
  setDraft: (field: Partial<CreateNoteDto>) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (field) =>
        set((state) => ({
          draft: { ...state.draft, ...field },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);*/