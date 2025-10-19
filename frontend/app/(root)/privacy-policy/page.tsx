/* eslint-disable react/no-unescaped-entities */
// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bloody",
  description: "Privacy Policy for the Bloody Blood Bank Management System.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f10] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-10">
          <h1 className="text-4xl font-bold text-center mb-2">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Last updated: <strong>October 11, 2025</strong>
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p className="leading-relaxed">
              Bloody operates the Blood Bank Management System. This Privacy
              Policy explains how we collect, use, disclose, and protect
              personal information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Account information:</strong> name, email, username,
                password (hashed), blood type, gender, and profile details.
              </li>
              <li>
                <strong>Donation &amp; request records:</strong> donation
                events, request history, hospitals, quantities, and dates.
              </li>
              <li>
                <strong>Usage data:</strong> logs, IP address, device
                information, and performance metrics to operate and improve the
                Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and maintain the Service and user accounts.</li>
              <li>Notify matching donors when a blood request is approved.</li>
              <li>
                Improve the Service, troubleshoot issues, and monitor usage.
              </li>
              <li>
                Send transactional emails (welcome, password reset,
                notifications).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Sharing &amp; Disclosure
            </h2>
            <p className="leading-relaxed mb-2">
              We will not sell your personal information. We may share
              information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                With trusted third-party providers who help deliver the Service
                (email, analytics).
              </li>
              <li>When required by law or to protect rights and safety.</li>
              <li>
                With your consent or as part of a merger or acquisition (you
                will be notified).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Security</h2>
            <p className="leading-relaxed">
              We employ administrative, technical, and physical safeguards
              designed to protect your information. However, no method of
              transmission or storage is completely secure — please take care
              when sharing sensitive data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Data Retention</h2>
            <p className="leading-relaxed">
              We retain user and donation/request data as long as needed to
              provide the Service, comply with legal obligations, resolve
              disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your jurisdiction, you may have rights to access,
              correct, or request deletion of your personal data. To exercise
              these rights, contact us at{" "}
              <a
                href="mailto:support@bloody.example"
                className="text-red-600 dark:text-red-400 underline hover:opacity-80"
              >
                support@bloody.example
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Children</h2>
            <p className="leading-relaxed">
              Our Service is not intended for children under 13. We do not
              knowingly collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to this Policy
            </h2>
            <p className="leading-relaxed">
              We may update this policy from time to time. We'll post the new
              policy here with a revised "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="leading-relaxed">
              If you have questions about this policy, contact us at{" "}
              <a
                href="mailto:maxamedmahdi459@gmail.com"
                className="text-red-600 dark:text-red-400 underline hover:opacity-80"
              >
                maxamedmahdi459@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
