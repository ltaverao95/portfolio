export type LocalizedString = {
  [key: string]: string;
}

export interface BlogPost {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  defaultLanguage: string;
  authorId: string;
  publicationDate: Date;
  lastModifiedDate: Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
