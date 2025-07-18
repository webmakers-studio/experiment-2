export interface EmailViewProps {
  id: number;
  subject: string;
  shortDescription: string;
  date: string;
  starred: boolean;
  attachments: number;
  important: boolean;
  labels: string[];
  body: string;
  sender: string;
}
