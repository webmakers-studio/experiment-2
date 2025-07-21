import React, { useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Star,
  Paperclip,
  ReplyAll,
  Forward,
  Send,
  ArrowLeft,
} from "lucide-react";
import { EmailViewProps } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface EmailViewExtendedProps extends EmailViewProps {
  onBackToList?: () => void;
  isMobile?: boolean;
}

const EmailView: React.FC<EmailViewExtendedProps> = ({
  subject,
  starred,
  attachments,
  sender,
  date,
  body,
  labels,
  onBackToList,
  isMobile,
}) => {
  const [replyText, setReplyText] = useState("");
  const replyRef = useRef<HTMLDivElement>(null);

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle sending the reply here
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };
  if (!subject) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select an email to view
      </div>
    );
  }

  return (
    <ScrollArea
      className={`flex-1 flex flex-col overflow-y-auto h-full ${
        isMobile ? "w-full" : ""
      }`}
    >
      <div className={`${isMobile ? "p-4" : "p-6"}`}>
        {/* Mobile Back Button */}
        {isMobile && onBackToList && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Inbox
            </Button>
          </div>
        )}

        {/* Email Header */}
        <div className="border-b pb-4 mb-4 sticky top-0 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h1 className={`font-bold ${isMobile ? "text-xl" : "text-2xl"}`}>
              {subject}
            </h1>
            <div className="flex items-center gap-2">
              {starred && (
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
              )}
              {attachments > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{attachments}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex ${
              isMobile ? "flex-col gap-2" : "items-center justify-between"
            } mb-3`}
          >
            <span className="text-gray-600">{sender}</span>
            <span className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: isMobile ? undefined : "long",
                year: "numeric",
                month: isMobile ? "short" : "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {labels.map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Email Body */}
        <div className="prose max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {body}
          </p>
        </div>

        {/* Email Attachments */}
        {attachments > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Paperclip size={18} className="text-gray-500" />
              Attachments ({attachments})
            </h2>
            <div className="flex flex-wrap gap-3">
              {[...Array(attachments)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                >
                  <Paperclip size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">
                    Attachment {idx + 1}
                  </span>
                  <button
                    className="ml-2 text-xs text-blue-600 hover:underline"
                    type="button"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply Actions */}
        <div ref={replyRef} className="py-4 mt-4 border-t">
          <div
            className={`flex gap-2 mb-4 ${isMobile ? "flex-col" : "flex-row"}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 justify-center"
            >
              <ReplyAll size={16} />
              Reply All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 justify-center"
            >
              <Forward size={16} />
              Forward
            </Button>
          </div>

          {/* Reply Compose Area - Always Visible */}
          <div className="space-y-4 p-2 pb-10">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3
                  className={`font-semibold ${
                    isMobile ? "text-base" : "text-lg"
                  }`}
                >
                  Reply to {sender}
                </h3>
              </div>

              <div className="space-y-3">
                <div
                  className={`${
                    isMobile ? "flex flex-col gap-1" : "flex gap-2"
                  } text-sm text-gray-600`}
                >
                  <span>To: {sender}</span>
                </div>
                <div
                  className={`${
                    isMobile ? "flex flex-col gap-1" : "flex gap-2"
                  } text-sm text-gray-600`}
                >
                  <span>Subject: Re: {subject}</span>
                </div>

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={isMobile ? 4 : 6}
                />

                <div
                  className={`flex ${
                    isMobile ? "flex-col gap-3 w-full" : "justify-between"
                  } items-center`}
                >
                  <div className="flex gap-2 w-full">
                    <Button
                      className={cn({
                        "w-full": isMobile,
                      })}
                      variant="outline"
                      size="sm"
                    >
                      <Paperclip size={16} className="mr-1" />
                      Attach
                    </Button>
                  </div>

                  <div
                    className={cn("flex gap-2", {
                      "w-full": isMobile,
                    })}
                  >
                    <Button
                      onClick={handleSendReply}
                      size="sm"
                      className={cn("flex items-center gap-2", {
                        "w-full": isMobile,
                      })}
                      disabled={!replyText.trim()}
                    >
                      <Send size={16} />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default EmailView;
