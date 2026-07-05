-- Write your PostgreSQL query statement below
SELECT
    CASE
        WHEN id = (SELECT COUNT(id) FROM Seat) AND MOD(id,2) != 0 THEN id
        WHEN MOD(id,2) != 0 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC
