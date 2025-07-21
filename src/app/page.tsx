"use client";

import EmailSidebar from "@/components/email-sidebar";
import EmailView from "@/components/email-view";
import { dummyEmails } from "@/data";
import { EmailViewProps } from "@/types";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState<EmailViewProps | null>(
    dummyEmails[0]
  );
  const [showEmailView, setShowEmailView] = useState(false);
  const isMobile = useIsMobile();

  const handleEmailSelect = (email: EmailViewProps) => {
    setSelectedEmail(email);
    if (isMobile) {
      setShowEmailView(true);
    }
  };

  const handleBackToList = () => {
    setShowEmailView(false);
  };

  return (
    <main className="h-full flex overflow-hidden">
      {/* Mobile: Show sidebar or email view based on state */}
      {isMobile ? (
        <>
          {!showEmailView ? (
            <EmailSidebar
              dummyEmails={dummyEmails}
              selectedEmail={selectedEmail}
              onEmailSelect={handleEmailSelect}
              isMobile={isMobile}
            />
          ) : (
            selectedEmail && (
              <EmailView
                {...selectedEmail}
                onBackToList={handleBackToList}
                isMobile={isMobile}
              />
            )
          )}
        </>
      ) : (
        /* Desktop: Show both sidebar and email view */
        <>
          <EmailSidebar
            dummyEmails={dummyEmails}
            selectedEmail={selectedEmail}
            onEmailSelect={handleEmailSelect}
            isMobile={isMobile}
          />
          {selectedEmail && (
            <EmailView
              {...selectedEmail}
              onBackToList={handleBackToList}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </main>
  );
}
