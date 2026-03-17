import styles from "./navbar.module.css";
import Link from "next/link"; // pour les performances, le prefetching, et la navigation client-side sans rechargement de page

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Navigation principale">
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/articles">Articles</Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/publier">Ajouter</Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/edit">Modifier</Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/delete">Supprimer</Link>
        </li>
      </ul>
    </nav>
  );
}
