import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Manage Blood Inventory with Confidence
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Role-based dashboards for Admins, Staff, and Users. Real-time
            inventory, secure auth, and streamlined workflows.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              className="rounded-md px-4 py-2 bg-primary text-primary-foreground"
              href="/auth/signUp"
            >
              Get Started
            </Link>
            <Link className="rounded-md px-4 py-2 border" href="/auth/login">
              Sign In
            </Link>
          </div>
        </section>

        <section id="features" className="px-6 py-12 bg-muted/30">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Authentication</h3>
              <p className="text-sm text-muted-foreground mt-1">
                JWT-based auth with profile and role-based access.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Inventory CRUD</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Staff/Admin can add, update, and delete blood records.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Admin Controls</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create staff and admin accounts directly from the dashboard.
              </p>
            </div>
          </div>
        </section>

        <section id="roles" className="px-6 py-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Admin</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Full access: users, inventory, and staff/admin creation.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Staff</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage blood records; no user management.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">User</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View personal profile and donations history.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-6 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Blood Bank. All rights reserved.
      </footer>
    </div>
  );
}