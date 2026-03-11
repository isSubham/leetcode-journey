-- Write your PostgreSQL query statement below

SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS salary
FROM Employee e
JOIN Department d
    ON d.id = e.departmentId
WHERE (
    SELECT
    COUNT(DISTINCT e1.salary)
    FROM Employee e1
    WHERE e1.departmentId = e.departmentId
        AND e1.salary > e.salary
) < 3


-- Write your PostgreSQL query statement below

-- SELECT
--     d.name AS Department,
--     t.name AS Employee,
--     t.salary As Salary
-- FROM Department d
-- JOIN (
--     SELECT e.* FROM Employee e
--         WHERE (
--             SELECT 
--                 COUNT(DISTINCT e1.salary)
--             FROM Employee e1
--             WHERE e.departmentId = e1.departmentId
--                 AND e1.salary > e.salary
--         ) < 3
-- ) t
-- ON d.id = t.departmentId

