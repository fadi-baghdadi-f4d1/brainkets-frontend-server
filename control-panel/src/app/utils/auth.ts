// auth.ts
import { cookies } from 'next/headers';

export const getAuthToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');
  return !!token;
};
