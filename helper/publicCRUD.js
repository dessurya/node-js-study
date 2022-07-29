const mysql = require("mysql2/promise")
const conn = require("./getConn")

select = async (params,subject) => {
    let str_query = "SELECT * FROM "+subject.table+" LIMIT 15"
    const confDb = await conn.getConn(subject.db)
    const openDb = await mysql.createConnection(confDb)
    const [data] = await openDb.execute(str_query,params)
    return await data
}

module.exports = { select }