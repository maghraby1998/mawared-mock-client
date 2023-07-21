export interface EmployeeFormData {
  id: number | null;
  name: string;
  email: string;
  password: string;
  officeId: string;
  departmentId: string;
  positionId: string;
  managerId?: string;
  userImageFile?: File | null;
  userImagePath?: string | null;
}
