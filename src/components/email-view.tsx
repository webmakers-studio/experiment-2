import React, { useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Paperclip, ReplyAll, Forward, Send } from "lucide-react";
import { EmailViewProps } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const EmailView: React.FC<EmailViewProps> = ({
  subject,
  starred,
  attachments,
  sender,
  date,
  body,
  labels,
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
    <ScrollArea className="flex-1 flex flex-col p-6 overflow-y-auto h-full">
      {/* Email Header */}
      <div className="border-b pb-4 mb-4 sticky top-0 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{subject}</h1>
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

        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">{sender}</span>
          <span className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex gap-2">
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
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ReplyAll size={16} />
            Reply All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
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
              <h3 className="text-lg font-semibold">Reply to {sender}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 text-sm text-gray-600">
                <span>To: {sender}</span>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <span>Subject: Re: {subject}</span>
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={6}
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip size={16} className="mr-1" />
                    Attach
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSendReply}
                    size="sm"
                    className="flex items-center gap-2"
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
    </ScrollArea>
  );
};

export default EmailView;
