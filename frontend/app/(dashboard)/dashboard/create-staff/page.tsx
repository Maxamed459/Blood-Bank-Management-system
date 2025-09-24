import RegisterStaff from "../_components/RegisterStaff";

export const metadata = {
  title: "Create Staff Account",
  description: "Register a new staff account for dashboard access.",
};

export default function createAdminAccount() {
  return <RegisterStaff />;
}
