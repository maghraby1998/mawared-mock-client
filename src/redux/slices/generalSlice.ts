import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isEmployeeModalOpen: boolean;
  isOfficeModalOpen: boolean;
  isDepartmentsModalOpen: boolean;
  isPositionsModalOpen: boolean;
}

const initialState: InitialState = {
  isEmployeeModalOpen: false,
  isOfficeModalOpen: false,
  isDepartmentsModalOpen: false,
  isPositionsModalOpen: false,
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

    toggleDepartmentModal: (state, action: PayloadAction<boolean>) => {
      state.isDepartmentsModalOpen = action.payload;
    },

    togglePositionModal: (state, action: PayloadAction<boolean>) => {
      state.isPositionsModalOpen = action.payload;
    },
  },
});

export const {
  toggleEmployeeModal,
  toggleOfficeModal,
  toggleDepartmentModal,
  togglePositionModal,
} = generalSlice.actions;

export default generalSlice.reducer;
