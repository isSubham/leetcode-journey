-- Write your PostgreSQL query statement below
SELECT w1.id FROM Weather w1
INNER JOIN Weather w2
ON w2.recordDate = w1.recordDate - INTERVAL '1 day'
WHERE w1.temperature >  w2.temperature;
