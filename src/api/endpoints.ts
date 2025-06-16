import { FieldType, OrderBy } from "../types/Search";

const BASE_URL = import.meta.env.PROD
  ? ""
  : "http://localhost:8080";

export const AuthEndpoints = {
  login: `${BASE_URL}/api/auth/login`,
  callback: `${BASE_URL}/api/auth/callback`,
  logout: `${BASE_URL}/api/auth/logout`,
  profile: `${BASE_URL}/api/auth/profile`,
};

export const UserBookStorage = {
  addToRead: `${BASE_URL}/api/googlebooks/read/add?volumeId=`,
  removeFromRead: `${BASE_URL}/api/googlebooks/read/add?volumeId=`
}

export const BooksEndpoints = {
  search: (params: Partial<{
    q: string;
    field: FieldType;
    orderBy: OrderBy;
    startIndex: number;
    langRestrict?: string;
  }>) => {
    const query = new URLSearchParams();

    if (params.q) {
      query.append('q',params.q);
    }
    if (params.orderBy) query.append('orderBy', params.orderBy);
    if (params.startIndex !== undefined) query.append('startIndex', String(params.startIndex));
    if (params.langRestrict) query.append('langRestrict', params.langRestrict);

    return `${BASE_URL}/api/books/search?${query.toString()}`;
  }
};

