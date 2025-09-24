import ProfileForm from "../_components/ProfileForm";

export default async function ProfilePage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <ProfileForm />
      </div>
    </div>
  );
}
