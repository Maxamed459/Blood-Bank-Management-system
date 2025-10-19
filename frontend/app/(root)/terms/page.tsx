// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Bloody",
  description: "Terms of Service for the Bloody Blood Bank Management System.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f10] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last updated: <strong>October 11, 2025</strong>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By using the Bloody platform (the "Service"), you agree to these
              Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Accounts</h2>
            <p className="leading-relaxed">
              You must provide accurate information to create an account. You
              are responsible for maintaining your password confidentiality and
              for all activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Use of the Service</h2>
            <p className="leading-relaxed">
              The Service facilitates matching donors and recipients and
              tracking blood inventory. You agree not to use the Service for
              illegal or harmful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Requests &amp; Notifications
            </h2>
            <p className="leading-relaxed">
              Users may request blood. Requests from regular users are subject
              to administrative approval before donors are notified. Admins and
              staff may create requests that are approved immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              The Service is provided "as is". We do not guarantee the
              availability, suitability, or safety of donors or recipients. We
              are not responsible for medical outcomes or third-party actions
              resulting from use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless Bloody and its affiliates
              from claims arising out of your use of the Service or your
              violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Termination</h2>
            <p className="leading-relaxed">
              We may suspend or terminate accounts for violations of these Terms
              or for other lawful reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the jurisdiction where the
              entity operating the Service is located.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
            <p className="leading-relaxed">
              We may modify these Terms. We will provide notice of material
              changes and post the updated Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="leading-relaxed">
              Questions about these Terms should be directed to{" "}
              <a
                href="mailto:maxamedmahdi459@gmail.com"
                className="text-red-600 dark:text-red-400 underline hover:opacity-80"
              >
                Maxamed Mahdi
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
