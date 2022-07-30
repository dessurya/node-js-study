const crud = require("../../helper/mysql/publicCRUD")
const db = "lsbl_cloud_dm"
const table = "damage_report_img"

select = async (params) => {
    const result = await crud.select(params,{db,table})
    return { params, result }
}

paginate = async (params) => {
    params.offset = (params.page-1)*params.limit
    const result_select = await crud.select(params,{db,table})
    const result_selectCount = await crud.selectCount(params,{db,table})
    const result = await crud.paginate(params,result_select,result_selectCount)
    return { params, result }
}

module.exports = { select, paginate }