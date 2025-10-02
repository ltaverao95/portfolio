import { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  publicationDate: Timestamp | Date;
  lastModifiedDate: Timestamp | Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
