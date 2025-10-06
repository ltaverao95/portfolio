/**
 * Validates an authentication token with a third-party service.
 * @param {string} token - The authentication token to validate.
 * @returns {Promise<boolean>} A promise that resolves with the validation result.
 */
export const verify_auth_token = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return false;
    }

    localStorage.setItem("auth_token", token);

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};
