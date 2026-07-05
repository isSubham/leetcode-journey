-- Write your PostgreSQL query statement below

WITH products_list AS (
    SELECT DISTINCT product_id
    FROM Products
), latest_change AS (
    SELECT 
        product_id,
        MAX(change_date) AS latest_change_date
    FROM Products
    WHERE change_date <= '2019-08-16'
    GROUP BY 
        product_id
), price_on_date AS (
    SELECT 
        l.product_id,
        p.new_price
    FROM latest_change l
    JOIN Products p
    ON l.product_id = p.product_id
        AND l.latest_change_date = p.change_date
)

SELECT
    pl.product_id,
    COALESCE(pod.new_price,10) AS price
FROM products_list pl
LEFT JOIN price_on_date pod
ON pod.product_id = pl.product_id
