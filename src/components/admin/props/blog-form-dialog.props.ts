import { BlogPost } from "@/lib/types";

  export interface BlogFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    post?: BlogPost;
    userId?: string | null;
    onMutation: (isMutating: boolean) => void;
  }
  