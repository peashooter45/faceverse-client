export interface PostInterface {
  _id: number;
  author: (number | string)[]; // User Reference
  content: String;
  image?: String;
  likes?: (number | string)[];
  comments?: (number | string)[];
  hashtags?: Array<string> | string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AuthorInterface {
  _id: number;
  firstName: string;
  lastName: string;
  updatedAt: Date;
}
export interface CommentInterface {
  _id: number;
  author: AuthorInterface[];
  post: (number | string)[];
  content?: string;
  replies?: (number | string)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInterface {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  friends?: number[];
  posts?: number[];
  notifications?: number[];
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: string;
  verifyToken: string;
  verifyTokenExpiry: Date;
}
export interface UserContextType {
  postAuthorId: number[] | null;
  setPostAuthorId: React.Dispatch<React.SetStateAction<number[] | null>>;
}