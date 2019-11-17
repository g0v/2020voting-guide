SELECT
    name,
    sum(value)
FROM
    `statistic`
where
    term = 9
    AND statisticType = 'legal_proposal'
    AND dataType = 'categories'
GROUP BY
    name