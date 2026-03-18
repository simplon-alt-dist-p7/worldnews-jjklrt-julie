import { render, screen, waitFor } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import Publier from "@/app/publier/page";

const feature = loadFeature("tests/integration/publier/publier.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("Publication réussie", ({ given, when, then, and }) => {
    given("l'utilisateur est sur la page de publication", () => {
      render(<Publier />);
    });

    and("l'API répond avec succès", () => {
      (global.fetch as unknown as jest.Mock).mockResolvedValue({
        ok: true,
      });
    });

    when("il remplit le formulaire avec des données valides", async () => {
      await userEvent.type(screen.getByPlaceholderText("Titre"), "Mon article");
      await userEvent.type(
        screen.getByPlaceholderText("Sous-titre"),
        "Sous titre",
      );
      await userEvent.type(screen.getByPlaceholderText("Chapeau"), "Résumé");
      await userEvent.type(
        screen.getByPlaceholderText("Corps de l'article"),
        "Contenu",
      );
    });

    and("il soumet le formulaire", async () => {
      await userEvent.click(screen.getByText("ENVOYER"));
    });

    then("un message de succès s'affiche", async () => {
      await waitFor(() => {
        expect(
          screen.getByText("Article publié avec succès !"),
        ).toBeInTheDocument();
      });
    });
  });

  test("Erreur si le titre est vide", ({ given, when, then }) => {
    given("l'utilisateur est sur la page de publication", () => {
      render(<Publier />);
    });

    when("il soumet le formulaire sans titre", async () => {
      await userEvent.click(screen.getByText("ENVOYER"));
    });

    then("un message d'erreur s'affiche", async () => {
      await waitFor(() => {
        expect(screen.getByText("Le titre est requis")).toBeInTheDocument();
      });
    });
  });
});
