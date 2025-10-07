import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import {
  useCollection,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
  useFirestore,
} from "@/firebase";

import axiosHttp from "../lib/http/axios-http-handler";

import { BlogPost, CreateBlogPostDto, UpdateBlogPostDto } from "@/lib/types";

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
 * Creates a new blog post by making an HTTP POST request.
 * @param createBlogDto - The data for the new blog post.
 * @returns A promise that resolves when the post is created.
 */
export const createBlogPost = async (createBlogDto: CreateBlogPostDto) => {
  try {
    const response = await axiosHttp.post(`/blog`, createBlogDto);

    if (response.status !== 201) {
      throw new Error(
        response.statusText ||
          `Failed to create post. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error; // Re-throw to be caught by the caller
  }
};

/**
 * Updates an existing blog post by making an HTTP PUT request.
 * @param postId - The ID of the blog post to update.
 * @param updateBlogPostDto - The updated blog post data.
 * @returns A promise that resolves when the post is updated.
 */
export const updateBlogPost = async (
  postId: string,
  updateBlogPostDto: UpdateBlogPostDto
) => {
  try {
    const response = await axiosHttp.put(`/blog/${postId}`, updateBlogPostDto);

    if (response.status !== 200) {
      throw new Error(
        response.statusText ||
          `Failed to update post. Status: ${response.status}`
      );
    }
  } catch (error) {
    errorEmitter.emit(
      "permission-error",
      new FirestorePermissionError({
        path: `blogPost/${postId}`,
        operation: "update",
        requestResourceData: updateBlogPostDto,
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
    const response = await axiosHttp.delete(`/blog/${postId}`);

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
    const response = await axiosHttp.post(`/blog/batch-delete`, {
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
