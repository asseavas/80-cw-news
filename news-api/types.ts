export interface ApiComment {
  news_id: number;
  author: string | null;
  text: string;
}

export interface Comment {
  id: number;
  news_id: number;
  author: string | null;
  text: string;
  created_at: string;
}

export interface ApiNews {
  title: string;
  text: string;
  image: string | null;
}

export interface News {
  id: number;
  title: string;
  text: string;
  image: string | null;
  created_at: string;
}
