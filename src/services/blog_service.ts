import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  writeBatch,
} from "firebase/firestore";
import {
  useCollection,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
  useFirestore,
} from "@/firebase";
import { BlogPost } from "@/lib/types";

/**
 * Custom hook to fetch blog posts from Firestore.
 * @returns An object containing the blog posts, loading state, and any errors.
 */
export const useBlogPosts = () => {
  const firestore = useFirestore();
  const blogPostsCollection = useMemoFirebase(
    () => collection(firestore, "blogPosts"),
    [firestore]
  );
  const {
    data: blogPosts,
    isLoading: isLoadingCollection,
    error,
  } = useCollection<BlogPost>(blogPostsCollection);

  return { blogPosts, isLoadingCollection, error };
};

/**
 * Deletes a single blog post.
 * @param firestore - The Firestore instance.
 * @param postId - The ID of the post to delete.
 */
export const deletePost = async (postId: string, firestore: Firestore) => {
  const docRef = doc(firestore, "blogPosts", postId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    errorEmitter.emit(
      "permission-error",
      new FirestorePermissionError({
        path: docRef.path,
        operation: "delete",
      })
    );
    throw error; // Re-throw to be caught by the caller
  }
};

/**
 * Deletes multiple blog posts in a batch.
 * @param firestore - The Firestore instance.
 * @param selectedRows - The selected rows from the table.
 * @returns A promise that resolves when the batch operation is complete.
 */
export const deleteSelectedPosts = async (
  selectedRows: { original: BlogPost }[],
  firestore: Firestore
) => {
  const batch = writeBatch(firestore);
  selectedRows.forEach((row) => {
    batch.delete(doc(firestore, "blogPosts", row.original.id));
  });

  try {
    await batch.commit();
  } catch (error) {
    errorEmitter.emit(
      "permission-error",
      new FirestorePermissionError({
        path: "blogPosts",
        operation: "delete",
      })
    );
    throw error; // Re-throw to be caught by the caller
  }
};
