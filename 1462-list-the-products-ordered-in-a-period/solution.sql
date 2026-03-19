-- Write your PostgreSQL query statement below

SELECT
    p.product_name,
    o.unit
FROM Products p
JOIN (
    SELECT
        product_id,
        SUM(unit) AS unit
    FROM Orders
    WHERE DATE_TRUNC('month',order_date) = '2020-02-01'
    GROUP BY product_id
    HAVING SUM(unit) >= 100
) o
ON p.product_id = o.product_id

