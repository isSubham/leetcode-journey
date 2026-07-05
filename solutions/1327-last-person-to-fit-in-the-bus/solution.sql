-- Write your PostgreSQL query statement below


-- person_id contains ALL 1 to n (unique)
-- turn contains ALL (1 to n)

SELECT p.person_name
FROM (
    SELECT person_name,
           SUM(weight) OVER ( ORDER BY turn ) AS total_weight
    FROM Queue
) p
WHERE p.total_weight <=1000
ORDER BY p.total_weight DESC LIMIT 1


-- SELECT q1.person_name
-- FROM Queue q1
-- JOIN Queue q2
--   ON q2.turn <= q1.turn
-- GROUP BY q1.turn, q1.person_name
-- HAVING SUM(q2.weight) <=1000
-- ORDER BY SUM(q2.weight) DESC
-- LIMIT 1

