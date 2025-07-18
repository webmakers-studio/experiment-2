import React from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Star } from "lucide-react";
import { EmailViewProps } from "@/types";

const EmailSidebar = ({
  dummyEmails,
  selectedEmail,
  onEmailSelect,
}: {
  dummyEmails: EmailViewProps[];
  selectedEmail: EmailViewProps | null;
  onEmailSelect: (email: EmailViewProps) => void;
}) => {
  return (
    <aside className="p-2 border-r w-1/3 flex flex-col h-full gap-y-2">
      <h2 className="text-xl font-bold">Inbox</h2>
      <Input placeholder="Search emails..." />
      <ScrollArea className="flex-1 mt-2 flex flex-col gap-y-2 h-full">
        {dummyEmails.map(
          ({
            id,

            subject,
            date,
            sender,
            shortDescription,
            labels,
            starred,
          }) => (
            <div
              onClick={() =>
                onEmailSelect(dummyEmails.find((email) => email.id === id)!)
              }
              key={id}
              className={`p-3 border-b flex flex-col gap-1 cursor-pointer ${
                selectedEmail?.id === id
                  ? "bg-primary/20 border-blue-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold truncate w-2/3">{subject}</span>
                <span className="text-xs text-gray-400 capitalize text-right flex justify-end">
                  {new Date(date)
                    .toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })
                    .toLowerCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{sender}</span>
                {starred && (
                  <Star
                    size={14}
                    className="text-yellow-400 fill-yellow-400 ml-1"
                  />
                )}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {shortDescription}
              </div>
              <div className="flex gap-1 mt-1">
                {labels.map((label) => (
                  <span
                    key={label}
                    className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </ScrollArea>
    </aside>
  );
};

export default EmailSidebar;
