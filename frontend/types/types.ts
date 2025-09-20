// Enums instead of object-like types
export type BloodType =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE";

export type Gender = "MALE" | "FEMALE";

export type Role = "USER" | "ADMIN" | "STAFF";

// User from backend
export interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
  blood_type: BloodType;
  gender: Gender;
  role: Role;
  createdAt: string; // comes as ISO string, not Date
  updatedAt: string;
}

// State shape
export interface AuthState {
  user: User | null;
  token: string | null;
  staff: User[] | null;
  loading: boolean;
  error: string | null;
}

export interface LoginAuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}
export interface RegisterAuthResponse {
  success: boolean;
  message: string;
  newUser: User;
  token: string;
}
