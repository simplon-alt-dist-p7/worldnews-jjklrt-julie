import { validateArticle } from "@/domain/articles/validateArticle";

describe("validateArticle", () => {
  it("retourne une erreur si le titre est vide", () => {
    const result = validateArticle({
      title: "",
    });

    expect(result).toContain("Le titre est requis");
  });

  it("retourne aucune erreur si le titre est présent", () => {
    const result = validateArticle({
      title: "Mon article",
    });

    expect(result).toEqual([]);
  });
});
