import { UserTokenPayload } from '@/types/interface';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import Cookies from 'js-cookie'; // Import Cookies from js-cookie

export const decodeJwtToken = (): UserTokenPayload | null => {
  const token = Cookies.get('userToken'); // Get the token from cookies

  if (!token) {
    return null;
  }

  try {
    // Decode the JWT token
    const decodedToken = jwtDecode<UserTokenPayload>(token);

    if (decodedToken) {
      return decodedToken;
    } else {
      console.error('Decoded token does not contain a valid id property');
      return null;
    }
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}