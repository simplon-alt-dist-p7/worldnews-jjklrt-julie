CREATE OR REPLACE FUNCTION writer.refresh_reader_view()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_matviews
        WHERE schemaname = 'reader'
        AND matviewname = 'articles_lecture'
    ) THEN
        REFRESH MATERIALIZED VIEW CONCURRENTLY reader.articles_lecture;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_changed
AFTER INSERT OR UPDATE OR DELETE
ON writer.articles
FOR EACH STATEMENT
EXECUTE FUNCTION writer.refresh_reader_view();
