/* eslint-disable react/no-unescaped-entities */
// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bloody",
  description: "Privacy Policy for the Bloody Blood Bank Management System.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="prose max-w-4xl mx-auto my-12 px-4">
      <h1>Privacy Policy</h1>
      <p className="lead">
        Last updated: <strong>October 11, 2025</strong>
      </p>

      <section>
        <h2>Introduction</h2>
        <p>
          Bloody operates the Blood Bank Management System. This Privacy Policy
          explains how we collect, use, disclose, and protect personal information
          when you use our Service.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> name, email, username, password
            (hashed), blood type, gender, and profile details.
          </li>
          <li>
            <strong>Donation &amp; request records:</strong> donation events, request
            history, hospitals, quantities, and dates.
          </li>
          <li>
            <strong>Usage data:</strong> logs, IP address, device information, and
            performance metrics to operate and improve the Service.
          </li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Data</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain the Service and user accounts.</li>
          <li>Notify matching donors when a blood request is approved.</li>
          <li>Improve the Service, troubleshoot issues, and monitor usage.</li>
          <li>Send transactional emails (welcome, password reset, notifications).</li>
        </ul>
      </section>

      <section>
        <h2>Sharing &amp; Disclosure</h2>
        <p>We will not sell your personal information. We may share information:</p>
        <ul>
          <li>
            With trusted third-party providers who help deliver the Service (email,
            analytics).
          </li>
          <li>When required by law or to protect rights and safety.</li>
          <li>
            With your consent or as part of a merger or acquisition (you will be
            notified).
          </li>
        </ul>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We employ administrative, technical, and physical safeguards designed to
          protect your information. However, no method of transmission or storage is
          completely secure — please take care when sharing sensitive data.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>
          We retain user and donation/request data as long as needed to provide the
          Service, comply with legal obligations, resolve disputes, and enforce our
          agreements.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or
          request deletion of your personal data. To exercise these rights, contact
          us at{" "}
          <a href="mailto:support@bloody.example">support@bloody.example</a>.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Our Service is not intended for children under 13. We do not knowingly
          collect information from children under 13.
        </p>
      </section>

      <section>
        <h2>Changes to this Policy</h2>
        <p>
          We may update this policy from time to time. We&apos;ll post the new
          policy here with a revised &quot;Last updated&quot; date.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          If you have questions about this policy, contact us at{" "}
          <a href="mailto:maxamedmahdi459@gmail.com">maxamedmahdi459@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
