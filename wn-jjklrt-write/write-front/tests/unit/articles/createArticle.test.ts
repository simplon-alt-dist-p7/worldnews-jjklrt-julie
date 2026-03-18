import { createArticle } from "../../../src/services/articles/createArticles";

describe("createArticle", () => {
  const mockForm = {
    title: "Test Title",
    sub_title: "Sub Title",
    article_lead: "Test Lead",
    body: "Test Body",
    categorie: "Test Categorie",
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("retourne success=true si API OK", async () => {
    const mockedFetch = global.fetch as jest.Mock;

    mockedFetch.mockResolvedValue({
      ok: true,
    });

    const result = await createArticle(mockForm);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("retourne une erreur si API KO", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Erreur API" }),
    });

    const result = await createArticle(mockForm);

    expect(result.success).toBe(false);
    expect(result.errors).toContain("Erreur API");
  });

  it("gère une erreur réseau", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network"));

    const result = await createArticle(mockForm);

    expect(result.success).toBe(false);
    expect(result.errors).toContain("Erreur réseau ou serveur.");
  });
});