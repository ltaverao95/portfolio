import { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  title_es: string;
  content_es: string;
  authorId: string;
  publicationDate: Timestamp | Date;
  lastModifiedDate: Timestamp | Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
