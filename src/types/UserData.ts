import { Volume } from "./Volume";

export interface UserData {
  email: string;
  profilePicture: string;
  read: Volume[];
}

export interface UserInfo {
  email: string;
  profilePicture: string;
}