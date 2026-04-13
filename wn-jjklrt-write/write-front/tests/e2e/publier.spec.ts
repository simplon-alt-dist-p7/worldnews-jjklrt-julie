// Test End to End pour la fonctionnalité de publication d'article

import { test, expect } from "@playwright/test";

test("publication réussie", async ({ page }) => {
  await page.route("**/api/articles", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto("http://localhost:3000/publier");

  await page.fill('input[name="title"]', "Mon article");
  await page.fill('input[name="sub_title"]', "Sous titre");
  await page.fill('textarea[name="article_lead"]', "Résumé");
  await page.fill('textarea[name="body"]', "Contenu");

  await page.click('button[type="submit"]');

  await expect(page.locator("text=Article publié avec succès")).toBeVisible();
});

test("erreur serveur API", async ({ page }) => {
  await page.route("**/api/articles", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Erreur serveur" }),
    });
  });

  await page.goto("http://localhost:3000/publier");

  await page.fill('input[name="title"]', "Mon article");
  await page.fill('input[name="sub_title"]', "Sous titre");
  await page.fill('textarea[name="article_lead"]', "Résumé");
  await page.fill('textarea[name="body"]', "Contenu");

  await page.click('button[type="submit"]');

  await expect(page.locator("text=Erreur serveur")).toBeVisible();
});

test("erreur si titre vide", async ({ page }) => {
  await page.goto("http://localhost:3000/publier");

  await page.click('button[type="submit"]');

  await expect(page.locator("text=Le titre est requis")).toBeVisible();
});
