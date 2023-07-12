import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isEmployeeModalOpen: boolean;
}

const initialState: InitialState = {
  isEmployeeModalOpen: false,
};

const generalSlice = createSlice({
  initialState,
  name: "generalSlice",
  reducers: {
    toggleEmployeeModal: (state, action: PayloadAction<boolean>) => {
      state.isEmployeeModalOpen = action.payload;
    },
  },
});

export const { toggleEmployeeModal } = generalSlice.actions;

export default generalSlice.reducer;
