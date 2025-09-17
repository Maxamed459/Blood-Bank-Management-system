export type BloodType = {
  A_POSITIVE: string;
  A_NEGATIVE: string;
  B_POSITIVE: string;
  B_NEGATIVE: string;
  O_POSITIVE: string;
  O_NEGATIVE: string;
  AB_POSITIVE: string;
  AB_NEGATIVE: string;
};
export type Gender = {
  MALE: string;
  FEMALE: string;
};
export type Role = {
  USER: string;
  ADMIN: string;
  STAFF: string;
};

export interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
  blood_type: BloodType;
  gender: Gender;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Types
export interface AuthState {
  user: {
    id: string;
    fullname: string;
    email: string;
    username: string;
    role: Role;
    gender: Gender;
    blood_type: BloodType;
    token: string;
  } | null;
  token: null;
  loading: boolean;
  error: string | null;
}
