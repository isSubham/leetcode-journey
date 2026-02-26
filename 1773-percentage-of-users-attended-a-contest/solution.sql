-- Write your PostgreSQL query statement below

SELECT r.contest_id,
       ROUND(
        COUNT(*)::numeric * 100 / (SELECT COUNT(user_id) FROM Users ),2
        ) AS percentage 
FROM Users u
JOIN Register r
ON u.user_id = r.user_id
GROUP BY r.contest_id
ORDER BY percentage DESC, r.contest_id
