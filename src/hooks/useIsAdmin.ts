import { useAuth } from "../store/AuthContext";

export const useIsAdmin = (): boolean => {
  const { user } = useAuth();

  if (!user) {
    return false;
  }

  return user.user_metadata.role === "admin";
};
