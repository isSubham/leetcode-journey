-- Write your PostgreSQL query statement below
SELECT name, population, area
FROM World
WHERE area >= 3 * POWER(10,6)
OR population >= 25 * POWER(10,6);
