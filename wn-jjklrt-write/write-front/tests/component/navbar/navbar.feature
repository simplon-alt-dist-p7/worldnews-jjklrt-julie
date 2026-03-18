
Feature: Navigation de la barre latérale (Navbar)
	En tant qu'utilisateur,
	Je veux pouvoir naviguer via la barre latérale
	Afin d'accéder facilement aux différentes fonctionnalités de l'application.

	Scenario: Affichage des liens de navigation
    Given l'utilisateur est sur la page principale
    Then la navbar affiche les liens suivants
        | Articles  |
        | Ajouter   |
        | Modifier  |
        | Supprimer |

	Scenario: Navigation vers la page d'ajout d'article
		Given l'utilisateur est sur la page principale
		When il clique sur le lien "Ajouter"
		Then il est redirigé vers la page d'ajout d'article

	Scenario: Navigation vers la page de modification d'article
		Given l'utilisateur est sur la page principale
		When il clique sur le lien "Modifier"
		Then il est redirigé vers la page de modification d'article

	Scenario: Navigation vers la page de suppression d'article
		Given l'utilisateur est sur la page principale
		When il clique sur le lien "Supprimer"
		Then il est redirigé vers la page de suppression d'article
