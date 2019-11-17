SELECT
    name,
    sum(value) count
FROM
    `statistic`
where
    term = 9
    AND statisticType = 'legal_proposal'
    AND dataType = 'categories'
GROUP BY
    name
ORDER BY
    count DESC