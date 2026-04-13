import { fireEvent, render, screen } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";

// import du composant Navbar à tester
import Navbar from "../../../src/components/navbar/navbar";

// chargement du scenario Gherkin depuis le fichier "".feature" par jest-cucumber
const feature = loadFeature("./tests/component/navbar/navbar.feature");

defineFeature(feature, (test) => {
  let _container: HTMLElement;

  // 1er test correspondant au 1er scénario Gherkin
  test("Affichage des liens de navigation", ({ given, then }) => {
    given("l'utilisateur est sur la page principale", () => {
      const rendered = render(<Navbar />);
      _container = rendered.container;
    });

    then("la navbar affiche les liens suivants", (table) => {
      // Articles est le nom de ma colonne dans le tableau Gherkin
      const links = table.map((row: Record<string, string>) => row.Articles);

      links.forEach((linkText: string) => {
        const link = screen.getByRole("link", { name: linkText });
        expect(link).toBeInTheDocument();
      });
    });
  });

  // 2eme test correspondant au 2eme scénario Gherkin
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

  // 3eme test correspondant au 3eme scénario Gherkin
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

  // 4eme test correspondant au 4eme scénario Gherkin
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
