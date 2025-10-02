import { Timestamp } from 'firebase/firestore';

export type LocalizedString = {
  [key: string]: string;
}

export interface BlogPost {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  defaultLanguage: string;
  authorId: string;
  publicationDate: Timestamp | Date;
  lastModifiedDate: Timestamp | Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
