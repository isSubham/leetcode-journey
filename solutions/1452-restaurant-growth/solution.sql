-- Write your PostgreSQL query statement below
-- WITH daily AS (
--     SELECT
--         visited_on,
--         SUM(amount) As daily_amount
--     FROM Customer
--     GROUP BY visited_on
-- ), visited_before_7 AS (
--     SELECT
--         MIN(visited_on) + INTERVAL '6 day' AS start_date
--     FROM daily
-- ), moving_calc AS (
-- SELECT
--     visited_on,
--     ROUND(
--         SUM(daily_amount) OVER(
--             ORDER BY visited_on
--             ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
--         ),
--         2
--      ) AS amount,
--     ROUND(
--         AVG(daily_amount) OVER(
--             ORDER BY visited_on
--             ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
--         ),
--         2
--      ) AS average_amount
-- FROM daily
-- )

-- SELECT * FROM moving_calc
-- WHERE visited_on >= (SELECT start_date FROM visited_before_7)

-- ALT.

WITH daily AS (
    SELECT
        visited_on,
        SUM(amount) AS daily_amount
    FROM Customer
    GROUP BY visited_on
)

SELECT
    visited_on,
    SUM(daily_amount) OVER(
        ORDER BY visited_on
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS amount,
    
    ROUND(
        AVG(daily_amount) OVER(
            ORDER BY visited_on
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2
    ) AS average_amount

FROM daily
OFFSET 6;
