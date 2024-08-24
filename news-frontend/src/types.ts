export interface News {
  id: number;
  title: string;
  text: string;
  image: string | null;
  created_at: string;
}

export interface ApiNews {
  title: string;
  text: string;
  image: string | null;
}
