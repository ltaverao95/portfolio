import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  useCollection,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
  useFirestore,
} from "@/firebase";

import axiosHttp from "../lib/http/axios-http-handler";

import { BlogPost } from "@/lib/types";

type BlogPostData = Omit<BlogPost, "id" | "publicationDate">;

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
 * Creates a new blog post in Firestore.
 * @param firestore - The Firestore instance.
 * @param postData - The data for the new blog post.
 * @returns A promise that resolves when the post is created.
 */
export const createBlogPost = async (
  firestore: any,
  postData: BlogPostData
) => {
  const colRef = collection(firestore, "blogPosts");
  const newPostData = {
    ...postData,
    publicationDate: serverTimestamp(),
  };
  try {
    await addDoc(colRef, newPostData);
  } catch (error) {
    errorEmitter.emit(
      "permission-error",
      new FirestorePermissionError({
        path: colRef.path,
        operation: "create",
        requestResourceData: newPostData,
      })
    );
    throw error; // Re-throw to be caught by the caller
  }
};

/**
 * Updates an existing blog post in Firestore.
 * @param firestore - The Firestore instance.
 * @param post - The original blog post object.
 * @param postData - The updated blog post data.
 * @returns A promise that resolves when the post is updated.
 */
export const updateBlogPost = async (
  firestore: any,
  post: BlogPost,
  postData: BlogPostData
) => {
  const docRef = doc(firestore, "blogPosts", post.id);
  const dataToUpdate = {
    ...postData,
    publicationDate: post.publicationDate, // Preserve original publication date
  };
  try {
    await setDoc(docRef, dataToUpdate, { merge: true });
  } catch (error) {
    errorEmitter.emit(
      "permission-error",
      new FirestorePermissionError({
        path: docRef.path,
        operation: "update",
        requestResourceData: dataToUpdate,
      })
    );
    throw error; // Re-throw to be caught by the caller
  }
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
