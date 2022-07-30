const crud = require("../../helper/publicCRUD")
const db = "lsbl_cloud_dm"
const table = "damage_report_img"

select = async (params) => {
    const result = await crud.select(params,{db,table})
    return { params, result }
}

paginate = async (params) => {
    const result = await crud.paginate(params,{db,table})
    return { params, result }
}

module.exports = { select, paginate }