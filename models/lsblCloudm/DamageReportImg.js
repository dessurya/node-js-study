const crud = require("../../helper/mysql/publicCRUD")
const db = "lsbl_cloud_dm"
const table = "damage_report_img"
const primary = "id_damage_img_global"

select = async (params) => {
    const result = await crud.select(params,{db,table})
    return { params, result }
}

selectCount = async (params) => {
    const result = await crud.selectCount(params,{db,table})
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

module.exports = { select, selectCount, paginate, first, find }