SELECT
    name,
    count(*) total
FROM
    `proposercosignatory`
WHERE
    role = 'proposer'
GROUP BY
    name
ORDER BY
    total desc