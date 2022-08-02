const crud = require("../../helper/mysql/publicCRUD")
const db = "lsbl_dev_campus"
const table = "tb_matkul"
const primary = "id_matkul"

select = async (params) => {
    const result = await crud.select(params,{db,table})
    return { params, result }
}

selectCount = async (params) => {
    const result = await crud.selectCount(params,{db,table})
    return { params, result }
}

selectPluck = async (params) => {
    let pluck = []
    let result = await crud.select(params,{db,table})
    result.data.forEach(row => {
        pluck.push(row[params.field])
    });
    result.data = pluck
    result.field = params.field
    return { params, result }
}

paginate = async (params) => {
    params.offset = (params.page-1)*params.limit
    const result_select = await crud.select(params,{db,table})
    const result_selectCount = await crud.selectCount(params,{db,table})
    const result = await crud.paginate(params,result_select,result_selectCount)
    return { params, result }
}

first = async (params) => {
    params.limit = 1
    let get = await crud.select(params,{db,table})
    get.data = get.data[0]
    const result = get
    return { params, result }
}

find = async (params) => {
    params.where = [ { 'key':primary, 'operator':'=', 'value': params.primary, 'andor':'' } ]
    const result = await first(params)
    return { params, result:result.result }
}

insert = async (params) => {
    const result = await crud.insert(params,{db,table})
    return { params, result }
}

update = async (params) => {
    const result_count = await selectCount(params)
    if (result_count.result.err != null) { return { params, result:result_count } }
    if (result_count.result.countRows == 0){ return { params, result:{ err: "data not found!" } } }
    const result = await crud.update(params,{db,table})
    return { params, result }
}

updateOrInsert = async (params) => {
    const result_count = await selectCount(params)
    if (result_count.result.err != null) { return { params, result:result_count } }
    if (result_count.result.countRows == 0){ return await insert(params) }
    else { return await update(params) }
}

deleteRows = async (params) => {
    const result = await crud.deleteRows(params,{db,table})
    return { params, result }
}

module.exports = { select, selectCount, selectPluck, paginate, first, find, insert, update, updateOrInsert, deleteRows }