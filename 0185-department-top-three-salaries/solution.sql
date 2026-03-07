-- Write your PostgreSQL query statement below

SELECT
    d.name AS Department,
    t.name AS Employee,
    t.salary As Salary
FROM Department d
JOIN (
    SELECT e.* FROM Employee e
        WHERE (
            SELECT 
                COUNT(DISTINCT e1.salary)
            FROM Employee e1
            WHERE e.departmentId = e1.departmentId
                AND e1.salary > e.salary
        ) < 3
) t
ON d.id = t.departmentId


