import { TranslationField } from "../models/translation-field.model";

// Form data shape

export type BlogPostFormData = {
  translations: TranslationField[];
  imageUrl: string;
  url: string;
  tags: string;
};
