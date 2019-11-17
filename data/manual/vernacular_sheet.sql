SELECT
    bill_info.name,
    bill_info.category,
    bill_info.billOrg,
    bill_info.billProposer,
    bill_info.billCosignatory,
    bill_info.billStatus,
    bill_info.billNo,
    billclicks.clicks,
    vernacular.vernacular,
    CONCAT(
        "https://voting-guide.appspot.com/vernacular",
        bill_info.billNo
    ) link
FROM
    billclicks
    LEFT JOIN (
        SELECT
            bill.name,
            bill.category,
            bill.billOrg,
            bill.billProposer,
            bill.billCosignatory,
            bill.billStatus,
            bill.billNo,
            bill.sessionTimes,
            bill.sessionPeriod
        FROM
            bill
        WHERE
            bill.term = '09'
            AND bill.category IS NOT NULL
        group by
            bill.name,
            bill.category,
            bill.billOrg,
            bill.billProposer,
            bill.billCosignatory,
            bill.billStatus,
            bill.billNo,
            bill.sessionTimes,
            bill.sessionPeriod
    ) bill_info on billclicks.name = bill_info.name
    AND billclicks.sessionPeriod = bill_info.sessionPeriod
    AND billclicks.sessionTimes = bill_info.sessionTimes
    LEFT JOIN (
        SELECT
            max(id) id,
            bill_no
        FROM
            vernacular
        GROUP BY
            bill_no
    ) t1 on t1.bill_no = bill_info.billNo
    LEFT JOIN vernacular ON vernacular.id = t1.id
WHERE
    bill_info.billNo IS NOT NULL
ORDER BY
    clicks DESC