import { BlogPost } from "@/lib/types";

// Representa un par de traducción para el formulario
export type TranslationField = {
    lang: string;
    title: string;
    content: string;
  };
  
  // Form data shape
  export type BlogPostFormData = {
    translations: TranslationField[];
    imageUrl: string;
    url: string;
    tags: string;
  };
  
  export interface BlogFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    post?: BlogPost;
    userId?: string | null;
    onMutation: (isMutating: boolean) => void;
  }
  