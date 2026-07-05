# Write your MySQL query statement below

-- WITH t_cte AS (
--     SELECT 
--         t.id,
--         COUNT(t.id) AS num
--     FROM
--         (
--             SELECT
--                 requester_id AS id
--             FROM RequestAccepted 
--             UNION ALL
--             SELECT
--                 accepter_id AS id
--             FROM RequestAccepted
--         ) t
-- )

-- SELECT * FROM t_cte
-- ORDER BY num DESC
-- LIMIT 1


SELECT
    t.id,
    COUNT(t.id) AS num
FROM (
        SELECT
            requester_id AS id
        FROM RequestAccepted 
        UNION ALL
        SELECT
            accepter_id AS id
        FROM RequestAccepted
    ) t
GROUP BY id 
ORDER BY num DESC
LIMIT 1
