// logique applicative pour la création d'articles

export interface ArticleForm {
  [key: string]: unknown;
}

export async function createArticle(form: ArticleForm) {
  try {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        success: false,
        errors: data?.errors ?? [data?.error ?? "Erreur inconnue"],
      };
    }

    return { success: true, errors: [] };
  } catch {
    return {
      success: false,
      errors: ["Erreur réseau ou serveur."],
    };
  }
}
