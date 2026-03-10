-- Write your PostgreSQL query statement below

-- WITH Combine_data AS (
--     SELECT u.user_id,u.name,m.movie_id,m.title,mr.rating,mr.created_at
--     FROM MovieRating mr
--     JOIN Movies m
--         ON mr.movie_id = m.movie_id
--     JOIN Users u
--         ON mr.user_id = u.user_id
-- ), User_rating AS (
--     SELECT
--         name,
--         COUNT(rating) AS rating
--     FROM Combine_data
--     GROUP BY user_id, name
-- ), Movie_rating AS (
--     SELECT title,AVG(rating) as rating
--     FROM Combine_data
--     WHERE DATE_TRUNC('month',created_at) = '2020-02-01'
--     GROUP BY movie_id,title
-- )


-- (SELECT title AS results FROM Movie_rating WHERE rating = (SELECT MAX(rating) FROM Movie_rating)
-- ORDER BY title ASC LIMIT 1)
-- UNION ALL
-- (SELECT name AS results FROM User_rating WHERE rating = (SELECT MAX(rating) FROM User_rating)
-- ORDER BY name ASC LIMIT 1)

WITH user_rating AS (
    SELECT u.name, COUNT(*) AS rating_count
    FROM MovieRating mr
    JOIN Users u
      ON mr.user_id = u.user_id
    GROUP BY u.user_id, u.name
),
movie_rating AS (
    SELECT m.title, AVG(mr.rating) AS avg_rating
    FROM MovieRating mr
    JOIN Movies m
      ON mr.movie_id = m.movie_id
    WHERE mr.created_at >= '2020-02-01'
      AND mr.created_at < '2020-03-01'
    GROUP BY m.movie_id, m.title
)

(SELECT name AS results
 FROM user_rating
 ORDER BY rating_count DESC, name
 LIMIT 1)

UNION ALL

(SELECT title AS results
 FROM movie_rating
 ORDER BY avg_rating DESC, title
 LIMIT 1);






