const mysql = require("mysql2/promise")
const conn = require("./getConn")

// private function
    buildWhere = (arr) => {
        let str_query = ''
        if (arr.length > 0) {
            str_query += ' WHERE '
            arr.forEach(eachData => {
                str_query += '`'+eachData.key+'` '+eachData.operator+' '+eachData.value+' '+eachData.andor
            })
        }
        return str_query
    }
// private function

// public function
    selectCount = async (params,subject) => {
        let str_query = "SELECT COUNT(*) AS countRows FROM "+subject.table
        str_query += await buildWhere(params.where)
        try {
            const confDb = await conn.getConn(subject.db)
            const openDb = await mysql.createConnection(confDb)
            const [data] = await openDb.execute(str_query,[])
            openDb.end()
            const countRows = data[0].countRows
            return {str_query,countRows,err:null}
        } catch (err) {
            return{str_query,countRows:0,err}
        }
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
            return {err:null,str_query,data}
        } catch (err) {
            return {err,str_query,data:null}
        }
    }
    
    paginate = (params,getData,countAllData) => {
        let to = params.offset+params.limit
        if (to > countAllData.countRows) { to = countAllData.countRows }
        let max_page = Math.ceil(countAllData.countRows/params.limit)
        if (max_page == 0) { max_page = 1}
        return {
            err:getData.err,
            str_query: getData.str_query,
            from: params.offset+1,
            to,
            total:countAllData.countRows,
            current_page:params.page,
            last_page:max_page,
            data: getData.data
        }
    }
// public function

module.exports = { select, selectCount, paginate }