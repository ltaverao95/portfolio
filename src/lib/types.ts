export type LocalizedString = {
  [key: string]: string;
};

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

export interface CreateBlogPostDto {
  title: LocalizedString;
  content: LocalizedString;
  defaultLanguage: string;
  tags: string[];
  imageUrl: string;
  url: string;
}

export interface UpdateBlogPostDto {
  title: LocalizedString;
  content: LocalizedString;
  defaultLanguage: string;
  tags: string[];
  imageUrl: string;
  url: string;
}
