const crud = require("../../helper/publicCRUD")
const db = "lsbl_cloud_dm"
const table = "damage_report_img"

select = async (params) => {
    const exe = await crud.select(params,{db,table})
    if (exe.err == null) {
        return {
            res: true,
            sql: exe.str_query,
            params,
            data: exe.data,
        }
    }else{
        return {
            res: false,
            sql: exe.str_query,
            params,
            result: exe.err,
        }
    }
}

module.exports = { select }