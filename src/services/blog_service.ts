import { collection } from "firebase/firestore";
import {
  useCollection,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
  useFirestore,
} from "@/firebase";

import axiosHttp from "../lib/http/axios-http-handler";

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
 * Deletes a single blog post by making an HTTP DELETE request.
 * @param postId - The ID of the post to delete.
 */
export const deletePost = async (postId: string) => {
  try {
    const response = await axiosHttp.delete(`/blogs/${postId}`);

    if (response.status !== 204) {
      throw new Error(
        response.statusText ||
          `Failed to delete post. Status: ${response.status}`
      );
    }

    // The request was successful, no content to return.
  } catch (error) {
    console.error("Error deleting post:", error);
    // Re-throw the error so the calling component can handle it (e.g., show a toast notification).
    throw error;
  }
};

/**
 * Deletes multiple blog posts in a batch.
 * @param firestore - The Firestore instance.
 * @param selectedRows - The selected rows from the table.
 * @returns A promise that resolves when the batch operation is complete.
 */
export const deleteSelectedPosts = async (
  selectedRows: { original: BlogPost }[]
) => {
  try {
    const response = await axiosHttp.post(`/blogs/batch-delete`, {
      blogIds: selectedRows.map((row) => row.original.id),
    });

    if (response.status !== 204) {
      throw new Error(
        response.statusText ||
          `Failed to delete post. Status: ${response.status}`
      );
    }
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
