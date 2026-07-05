-- Write your PostgreSQL query statement below

-- SELECT DISTINCT l1.num AS ConsecutiveNums
-- FROM Logs l1
-- JOIN Logs l2 ON l2.id = l1.id + 1
-- JOIN Logs l3 ON l3.id = l1.id + 2
-- WHERE l1.num = l2.num
--   AND l2.num = l3.num;

SELECT
    DISTINCT num AS ConsecutiveNums
FROM (
    SELECT 
        id,
        num,
        LEAD(num,1) OVER(ORDER BY id) AS next,
        LEAD(num,2) OVER(ORDER BY id) AS next_next
    FROM Logs
) t
WHERE num = t.next AND num = t.next_next


