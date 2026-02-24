-- Write your PostgreSQL query statement below
-- WITH Managers AS (
--     SELECT
--         managerId,
--         COUNT(id) AS direct_report
--     FROM Employee
--     WHERE managerId IS NOT NULL
--     GROUP BY managerId
-- )

-- SELECT e.name FROM Employee e
-- JOIN Managers m
-- ON e.id = m.managerId
--     AND direct_report >=5;

SELECT e2.name
FROM Employee e1
JOIN Employee e2
    on e1.managerId = e2.id
GROUP BY e2.id , e2.name
HAVING COUNT(e1.id) >= 5
