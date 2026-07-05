-- Write your PostgreSQL query statement below

WITH categories AS (
    SELECT 'Low Salary' AS category
    UNION ALL
    SELECT 'Average Salary'
    UNION ALL
    SELECT 'High Salary'
)

SELECT
    c.category,
    COUNT(a.account_id) AS accounts_count
FROM categories c
LEFT JOIN (
        SELECT
        account_id,
        income,
        CASE
            WHEN income < 20000 THEN 'Low Salary'
            WHEN income BETWEEN 20000 AND 50000 THEN 'Average Salary'
            WHEN income > 50000 THEN 'High Salary'
        END AS category
    FROM Accounts
) a
ON c.category = a.category
GROUP BY c.category






