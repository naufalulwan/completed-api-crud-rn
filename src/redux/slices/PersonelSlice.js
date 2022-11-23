import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personel: {
    id: 0,
  },
  isEdit: false,
};

const PersonelSlice = createSlice({
  name: "personel",
  initialState,
  reducers: {
    setPersonelbyId: (state, action) => {
      state.personel.id = action.payload;
    },
    setEdit: (state, action) => {
      state.isEdit = action.payload;
    },
  },
});

export const actionReducer = (state) =>
  state.persistedReducer.personel.personel;
export const actionReducerEdit = (state) =>
  state.persistedReducer.personel.isEdit;
export const { setPersonelbyId, setEdit } = PersonelSlice.actions;
export default PersonelSlice.reducer;
