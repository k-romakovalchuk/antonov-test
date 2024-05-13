import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { Note } from '../type';
import { createNote, deleteNote, getNotes, updateNote } from '../api/notes';

export interface InitialState {
  notes: Note[],
  note: Note | null,
  title: string,
  body: string,
  status: 'idle' | 'loading' | 'failed',
  hasError: boolean
}

export type Field = {
  name: 'title' | 'body',
  text: string,
}

export const initialState: InitialState = {
  notes: [],
  note: null,
  title: '',
  body: '',
  status: 'loading',
  hasError: false
};

export const notesAsync = createAsyncThunk(
  'notes/getNotesAsync', getNotes
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNoteAsync', deleteNote
);

export const createNoteAsync = createAsyncThunk(
  'notes/createNoteAsync', createNote
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNoteAsync', updateNote
);

export const notesReducer = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(notes => notes.id !== action.payload);
    },
    setField: (state, action: PayloadAction<Field>) => {
      state[action.payload.name] = action.payload.text
    },
    setNote: (state, action: PayloadAction<Note>) => {
      state.note = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(notesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(notesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes = action.payload;
      })
      .addCase(notesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createNoteAsync.fulfilled, (state) => {
        state.hasError = false;
      })
      .addCase(createNoteAsync.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(updateNoteAsync.fulfilled, (state) => {
        state.hasError = false;
      })
      .addCase(updateNoteAsync.rejected, (state) => {
        state.hasError = true;
      })
  },
});

export default notesReducer.reducer;

export const { removeNote,setField,setNote } = notesReducer.actions;
