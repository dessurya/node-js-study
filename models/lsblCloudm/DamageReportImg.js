const crud = require("../../helper/publicCRUD")
const db = "lsbl_cloud_dm"
const table = "damage_report_img"

select = async (params) => {
    const exe = await crud.select(params,{db,table})
    return await {
        res: true,
        data: exe
    }
}

module.exports = { select }