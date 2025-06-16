export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

export interface Volume {
  id: string;
  kind?: string;
  etag?: string;
  selfLink?: string;
  volumeInfo: VolumeInfo;
}
