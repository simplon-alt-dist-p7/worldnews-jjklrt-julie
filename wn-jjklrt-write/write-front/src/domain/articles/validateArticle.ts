// logique métier pour la validation d'articles

export interface ArticleForm {
  title?: string;
  [key: string]: unknown;
}

export function validateArticle(form: ArticleForm): string[] {
  const errors: string[] = [];

  if (!form.title || form.title.trim() === "") {
    errors.push("Le titre est requis");
  }

  return errors;
}
