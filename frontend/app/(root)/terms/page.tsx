// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Bloody",
  description: "Terms of Service for the Bloody Blood Bank Management System.",
};

export default function TermsOfServicePage() {
  return (
    <main className="prose max-w-4xl mx-auto my-12 px-4">
      <h1>Terms of Service</h1>
      <p className="lead">
        Last updated: <strong>October 11, 2025</strong>
      </p>

      <section>
        <h2>Acceptance of Terms</h2>
        <p>
          By using the Bloody platform (the &quot;Service&quot;), you agree to these
          Terms of Service. If you do not agree, do not use the Service.
        </p>
      </section>

      <section>
        <h2>Accounts</h2>
        <p>
          You must provide accurate information to create an account. You are
          responsible for maintaining your password confidentiality and for all
          activity under your account.
        </p>
      </section>

      <section>
        <h2>Use of the Service</h2>
        <p>
          The Service facilitates matching donors and recipients and tracking blood
          inventory. You agree not to use the Service for illegal or harmful purposes.
        </p>
      </section>

      <section>
        <h2>Requests &amp; Notifications</h2>
        <p>
          Users may request blood. Requests from regular users are subject to
          administrative approval before donors are notified. Admins and staff may
          create requests that are approved immediately.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          The Service is provided &quot;as is&quot;. We do not guarantee the availability,
          suitability, or safety of donors or recipients. We are not responsible for
          medical outcomes or third-party actions resulting from use of the Service.
        </p>
      </section>

      <section>
        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Bloody and its affiliates from
          claims arising out of your use of the Service or your violation of these
          Terms.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may suspend or terminate accounts for violations of these Terms or for
          other lawful reasons.
        </p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction where the
          entity operating the Service is located.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We may modify these Terms. We will provide notice of material changes
          and post the updated Terms on this page.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these Terms should be directed to{" "}
          <a href="mailto:maxamedmahdi459@gmail.com">Maxamed Mahdi</a>.
        </p>
      </section>
    </main>
  );
}
