-- Write your PostgreSQL query statement below
WITH duration_cte AS (
    SELECT
        machine_id, 
        process_id,
        (MAX(timestamp) - MIN(timestamp)) AS duration
    FROM Activity
    GROUP BY machine_id, process_id
)


SELECT
    machine_id,
    ROUND(AVG(duration)::numeric, 3) AS processing_time
FROM duration_cte
GROUP BY machine_id
