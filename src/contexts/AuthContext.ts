import { createContext } from "react";

type User = {
  username: string;
  name: string;
  email: string;
  bio: string;
};

type Posts = {
  title: string;
  content: string;
  created_at: Date;
};

type Data = {
  user: User;
  posts: Posts[];
  loading: boolean;
};

type AuthContextType = {
  me: Data | null;
  getMe: () => Promise<void>;
  loading: true;
};

export const AuthContext = createContext<AuthContextType | null>(null);
