from db import Bill, mysql_db


def update_vernacular():
    cursor = mysql_db.execute_sql(
        """SELECT
        v1.id,
        v2.bill_no,
        v2.vernacular
        FROM
        (SELECT max(id) id
        FROM `vernacular`
        GROUP BY bill_no) v1
        JOIN vernacular v2 ON v1.id = v2.id"""
    )
    for id, billNo, vernacular in cursor.fetchall():
        print(vernacular.replace("\n", ""))
        Bill.update(vernacular=vernacular).where(Bill.billNo == billNo).execute()


if __name__ == "__main__":
    update_vernacular()
