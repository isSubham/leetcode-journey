-- Write your PostgreSQL query statement below

    SELECT
        q.query_name,
        ROUND(
            AVG(q.rating::numeric/q.position) 
        , 
        2) AS quality,
        ROUND(
            SUM(CASE WHEN q.rating < 3 THEN 1 ELSE 0 END)::numeric * 100 
            / COUNT(*),
        2) AS poor_query_percentage
    FROM Queries q
    GROUP BY q.query_name




