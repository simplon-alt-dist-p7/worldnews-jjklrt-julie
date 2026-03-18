Feature: Publication d’un article

  Scenario: Publication réussie
    Given l'utilisateur est sur la page de publication
    And l'API répond avec succès
    When il remplit le formulaire avec des données valides
    And il soumet le formulaire
    Then un message de succès s'affiche

  Scenario: Erreur si le titre est vide
    Given l'utilisateur est sur la page de publication
    When il soumet le formulaire sans titre
    Then un message d'erreur s'affiche