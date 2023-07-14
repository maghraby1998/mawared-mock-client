import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isEmployeeModalOpen: boolean;
  isOfficeModalOpen: boolean;
}

const initialState: InitialState = {
  isEmployeeModalOpen: false,
  isOfficeModalOpen: false,
};

const generalSlice = createSlice({
  initialState,
  name: "generalSlice",
  reducers: {
    toggleEmployeeModal: (state, action: PayloadAction<boolean>) => {
      state.isEmployeeModalOpen = action.payload;
    },

    toggleOfficeModal: (state, action: PayloadAction<boolean>) => {
      state.isOfficeModalOpen = action.payload;
    },
  },
});

export const { toggleEmployeeModal, toggleOfficeModal } = generalSlice.actions;

export default generalSlice.reducer;
