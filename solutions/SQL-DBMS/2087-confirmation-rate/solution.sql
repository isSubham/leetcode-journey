-- Write your PostgreSQL query statement below

WITH rate AS (
    SELECT
        s.user_id,
        SUM(CASE WHEN action IS NOT NULL THEN 1 ELSE 0 END) AS total_action,
        SUM(CASE WHEN action = 'confirmed' THEN 1 ELSE 0 END) AS conf_action
    FROM Signups s
    LEFT JOIN Confirmations c
    ON s.user_id = c.user_id
    GROUP BY s.user_id
)

SELECT 
    user_id,
    ROUND(    CASE
        WHEN total_action = 0 THEN 0
        ELSE conf_action::numeric/total_action
    END , 2)
AS confirmation_rate
FROM rate


