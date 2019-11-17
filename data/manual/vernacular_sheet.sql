SELECT
    bill.name,
    bill.category,
    bill.billOrg,
    bill.billProposer,
    bill.billCosignatory,
    bill.billStatus,
    bill.billNo,
    billclicks.clicks,
    vernacular.vernacular,
    CONCAT(
        "https://voting-guide.appspot.com/vernacular",
        bill.billNo
    ) link
FROM
    bill
    LEFT JOIN billclicks on billclicks.name = bill.name
    AND billclicks.sessionPeriod = bill.sessionPeriod
    AND billclicks.sessionTimes = bill.sessionTimes
    LEFT JOIN (
        SELECT
            max(id) id,
            bill_no
        FROM
            vernacular
        GROUP BY
            bill_no
    ) t1 on t1.bill_no = bill.billNo
    LEFT JOIN vernacular ON vernacular.id = t1.id
WHERE
    bill.term = '09'
    AND bill.category IS NOT NULL
    AND bill.billOrg != '行政院'
    AND NOT (
        bill.billOrg NOT LIKE '%黨團'
        AND bill.billProposer IS NULL
    )
GROUP BY
    bill.name,
    bill.category,
    bill.billOrg,
    bill.billProposer,
    bill.billCosignatory,
    bill.billStatus,
    bill.billNo,
    bill.sessionTimes,
    bill.sessionPeriod,
    billclicks.clicks,
    vernacular.vernacular,
    link
ORDER BY
    clicks DESC