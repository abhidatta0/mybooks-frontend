import { useAuth } from './AuthProvider';

export const useAuthUser = () => {
  const { user } = useAuth();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
};