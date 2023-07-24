import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DeleteEmployeeAction = {
  isOpen: boolean;
  employeeId: number | null;
};

interface InitialState {
  isEmployeeModalOpen: boolean;
  isOfficeModalOpen: boolean;
  isDepartmentsModalOpen: boolean;
  isPositionsModalOpen: boolean;
  deleteEmployeeModal: DeleteEmployeeAction;
}

const initialState: InitialState = {
  isEmployeeModalOpen: false,
  isOfficeModalOpen: false,
  isDepartmentsModalOpen: false,
  isPositionsModalOpen: false,
  deleteEmployeeModal: {
    isOpen: false,
    employeeId: null,
  },
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

    toggleDeleteEmployeeModal: (
      state,
      action: PayloadAction<DeleteEmployeeAction>
    ) => {
      state.deleteEmployeeModal = action.payload;
    },
  },
});

export const {
  toggleEmployeeModal,
  toggleOfficeModal,
  toggleDepartmentModal,
  togglePositionModal,
  toggleDeleteEmployeeModal,
} = generalSlice.actions;

export default generalSlice.reducer;
