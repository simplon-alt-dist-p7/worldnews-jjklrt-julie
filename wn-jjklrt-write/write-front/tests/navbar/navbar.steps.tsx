import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "../../src/components/navbar/navbar";

const feature = loadFeature("./tests/navbar/navbar.feature"); // chargement du scenario Gherkin depuis le fichier "".feature" par jest-cucumber

defineFeature(feature, (test) => {
  let container: HTMLElement;

  test("Affichage des liens de navigation", ({ given, then }) => {
    given("l'utilisateur est sur la page principale", () => {
      const rendered = render(<Navbar />);
      container = rendered.container;
    });

    then("la navbar affiche les liens suivants", (table) => {
      const links = table.map((row: any) => row.Articles); // Articles est le nom de ma colonne dans le tableau Gherkin

      links.forEach((linkText: string) => {
        const link = screen.getByRole("link", { name: linkText });
        expect(link).toBeInTheDocument();
      });
    });
  });

  test("Navigation vers la page d'ajout d'article", ({ given, when, then }) => {
    given("l'utilisateur est sur la page principale", () => {
      render(<Navbar />);
    });

    when('il clique sur le lien "Ajouter"', () => {
      const link = screen.getByRole("link", { name: "Ajouter" });
      fireEvent.click(link);
    });

    then("il est redirigé vers la page d'ajout d'article", () => {
      const link = screen.getByRole("link", { name: "Ajouter" });
      expect(link).toHaveAttribute("href", "/publier");
    });
  });

  test("Navigation vers la page de modification d'article", ({
    given,
    when,
    then,
  }) => {
    given("l'utilisateur est sur la page principale", () => {
      render(<Navbar />);
    });

    when('il clique sur le lien "Modifier"', () => {
      const link = screen.getByRole("link", { name: "Modifier" });
      fireEvent.click(link);
    });

    then("il est redirigé vers la page de modification d'article", () => {
      const link = screen.getByRole("link", { name: "Modifier" });
      expect(link).toHaveAttribute("href", "/edit");
    });
  });

  test("Navigation vers la page de suppression d'article", ({
    given,
    when,
    then,
  }) => {
    given("l'utilisateur est sur la page principale", () => {
      render(<Navbar />);
    });

    when('il clique sur le lien "Supprimer"', () => {
      const link = screen.getByRole("link", { name: "Supprimer" });
      fireEvent.click(link);
    });

    then("il est redirigé vers la page de suppression d'article", () => {
      const link = screen.getByRole("link", { name: "Supprimer" });
      expect(link).toHaveAttribute("href", "/delete");
    });
  });
});
