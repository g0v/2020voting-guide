


-- average propose num statistic
SELECT avg(count)
FROM (SELECT name, count(*) count FROM proposercosignatory where role = 'proposer' group by name order by count) bill_count

-- medium propose num statistic
SELECT name, count(*) count FROM proposercosignatory where role = 'proposer' group by name order by count

-- average sitting rate statistic
SELECT avg(sittingNum / maxSittingNum) FROM `legislator` where term = '09'

-- medium sitting rate statistic
SELECT name, sittingNum / maxSittingNum FROM `legislator` where term = '09' order by sittingNum / maxSittingNum