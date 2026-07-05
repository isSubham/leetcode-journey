-- Write your PostgreSQL query statement below
SELECT
    x,
    y,
    Z,
    CASE
        WHEN X>0 AND y>0 AND z>0 
        AND x + y > z 
        AND x + z > y 
        AND y + z > x  THEN 'Yes'
        ELSE 'No'
    END AS triangle
FROM Triangle

