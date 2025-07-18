"use client";

import EmailSidebar from "@/components/email-sidebar";
import EmailView from "@/components/email-view";
import { dummyEmails } from "@/data";
import { EmailViewProps } from "@/types";
import { useState } from "react";

export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState<EmailViewProps | null>(
    dummyEmails[0]
  );

  const handleEmailSelect = (email: EmailViewProps) => {
    setSelectedEmail(email);
  };

  return (
    <main className="h-full flex overflow-hidden">
      <EmailSidebar
        dummyEmails={dummyEmails}
        selectedEmail={selectedEmail}
        onEmailSelect={handleEmailSelect}
      />
      {selectedEmail && <EmailView {...selectedEmail} />}
    </main>
  );
}
