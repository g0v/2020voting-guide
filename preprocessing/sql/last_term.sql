-- count last_term for candidate list

select count(*), last_term
from (
    SELECT max(CAST(term as UNSIGNED)) as last_term, name FROM `legislator_record` where name in (select name from candidate) group by name order by last_term desc
) as ttt
group by last_term

