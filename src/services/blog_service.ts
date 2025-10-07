import axiosHttp from "../lib/http/axios-http-handler";

import { BlogPost, CreateBlogPostDto, UpdateBlogPostDto } from "@/lib/types";

/**
 * Fetches all blog posts by making an HTTP GET request.
 * @returns A promise that resolves to an array of blog posts.
 */
export const getBlogs = async () => {
  try {
    const response = await axiosHttp.get<BlogPost[]>(`/blogs`);

    if (response.status !== 200) {
      throw new Error(
        response.statusText ||
          `Failed to fetch posts. Status: ${response.status}`
      );
    }
    return response.data;
  } catch (error) {
    throw error;
  }
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
    throw error;
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
    throw error;
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
  } catch (error) {
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
    throw error;
  }
};
