const mysql = require("mysql2/promise")
const conn = require("./getConn")

buildWhere = async (arr) => {
    let str_query = ''
    if (arr.length > 0) {
        str_query += ' WHERE '
        arr.forEach(eachData => {
            str_query += '`'+eachData.key+'` '+eachData.operator+' '+eachData.value+' '+eachData.andor
        })
    }
    return await str_query
}

select = async (params,subject) => {
    let str_query = "SELECT * FROM "+subject.table
    str_query += await buildWhere(params.where)
    if (params.orderbBy.key.length > 0) {
        str_query += ' ORDER BY '
        const joinOrderKey = params.orderbBy.key.map((data) => data).join(', ')
        str_query += joinOrderKey+' '+params.orderbBy.value
    }
    if (params.limit != undefined && params.limit != null && params.limit != '') {
        str_query += ' LIMIT '+params.limit
    }
    if (params.offset != undefined && params.offset != null && params.offset != '') {
        str_query += ' OFFSET '+params.offset
    }
    try {
        const confDb = await conn.getConn(subject.db)
        const openDb = await mysql.createConnection(confDb)
        const [data] = await openDb.execute(str_query,[])
        openDb.end()
        return {str_query,data,err:null}
    } catch (err) {
        return{str_query,data:null,err}
    }
}

module.exports = { select }