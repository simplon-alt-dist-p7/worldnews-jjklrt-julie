"use client";
import Card from "@/components/articles/card";
import { useEffect, useState } from "react";
import styles from "./articles.module.css";

type Article = {
  title: string;
  sub_title: string;
  article_lead: string;
  body: string;
  categorie: string;
  published_at: string;
};

export default function Articles() {

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if (!API_URL) {
        console.error("NEXT_PUBLIC_API_URL n'est pas défini !");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/articles`);
        if (!res.ok) {
          console.error("Erreur fetch:", res.status);
          return;
        }
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Erreur fetch:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.publierPage}>
      <h1>Vos Articles</h1>
      {articles.length > 0 ? <Card articles={articles} /> : <div>Pas d'articles pour le moment</div>}
    </div>
  );
}
