-- Write your PostgreSQL query statement below
WITH FirstOrders AS (SELECT 
    customer_id,
    MIN(order_date) AS first_order
FROM Delivery
GROUP BY customer_id
)

SELECT 
ROUND(
    SUM(
        CASE
            WHEN d.customer_pref_delivery_date = d.order_date
            THEN 1
            ELSE 0
        END
    ) * 100.0
    / COUNT(*),
    2
) AS immediate_percentage
FROM Delivery d
JOIN FirstOrders f ON d.customer_id = f.customer_id
    AND f.first_order = d.order_date
