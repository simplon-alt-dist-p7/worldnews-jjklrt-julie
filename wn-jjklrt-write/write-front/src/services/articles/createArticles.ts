// logique métier pour la création d'articles

export async function createArticle(form: any) {
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