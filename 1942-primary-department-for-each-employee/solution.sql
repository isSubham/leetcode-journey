-- Write your PostgreSQL query statement below

WITH single_dept AS (
    SELECT
        employee_id
    FROM Employee
    GROUP BY employee_id
    HAVING COUNT(*) = 1
)

SELECT 
    e.employee_id,
    e.department_id
FROM Employee e
LEFT JOIN single_dept d
    ON e.employee_id = d.employee_id
WHERE e.primary_flag = 'Y'
    OR d.employee_id IS NOT NULL

