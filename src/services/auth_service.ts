import axios from 'axios';

/**
 * Validates an authentication token with a third-party service.
 * @param {string} token - The authentication token to validate.
 * @returns {Promise<{ success: boolean }>} A promise that resolves with the validation result.
 */
export const validate_token = async (token: string): Promise<{ success: boolean }> => {
  try {
    
    const response = await fetch(`http://localhost:3000/api/auth/verify-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
        return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error('Error validating token:', error);
    return { success: false };
  }
};
