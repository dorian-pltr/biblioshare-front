export interface Book {
  id: number;
  img: string;
  title: string;
  authors: string | null;
  date: string | null;
  desc: string | null;
  language: string | null;
}
