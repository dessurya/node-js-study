const fetchConfig = {
    method: null,
    body: null,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' }
}

window.addEventListener('load', function () {
    callList(true)
})

callList = async (firstPage) => {
    $('#listData table tbody').html('')
    let param = {}
    param.nama_matkul = $('#listData .card-header [name=fillter_nama_matkul]').val()
    param.ket = $('#listData .card-header [name=fillter_ket]').val()
    param.limit = $('#listData .card-header [name=show]').val()
    param.order_by = $('#listData .card-header [name=order_by]').val()
    param.order_by_value = $('#listData .card-header [name=order_by_value]').val()
    param.page = 1
    if (firstPage == false) { param.page = $('#listData .card-header #halaman [name=halaman]').val() }
    param = btoa(JSON.stringify(param))
    let config = fetchConfig
    config.body = null
    config.method = 'GET'
    const getList = await fetch('/TbMatkul/paginate/'+param,config).then((response) => response.json()).catch((e) => console.log(e))
    $('#listData .card-header #show b#start').html(getList.result.from)
    $('#listData .card-header #show b#end').html(getList.result.to)
    $('#listData .card-header #halaman label b').html(getList.result.last_page)
    $('#listData .card-header #halaman [name=halaman]').val(getList.result.current_page)
    $('#listData .card-header #halaman [name=halaman]').prop('max',getList.result.last_page)
    if (getList.result.data.length == 0) {
            $('#listData table tbody').append('<tr><th class="text-center>--Data Not Found--</th></tr>"')
    }else{
        getList.result.data.forEach(data => {
            let render = ''
            render += '<tr>'
            render += '<td>'
            render += '<div class="btn-group" role="group" aria-label="tools">'
            render += '<span onclick="showData('+data.id_matkul+')" class="btn btn-sm btn-outline-info">Open</span>'
            render += '<span onclick="deleteData('+data.id_matkul+')" class="btn btn-sm btn-outline-danger">Delete</span>'
            render += '</div>'
            render += '</td>'
            render += '<td>'+data.id_matkul+'</td>'
            render += '<td>'+data.nama_matkul+'</td>'
            render += '<td>'+data.ket+'</td>'
            render += '</tr>'
            $('#listData table tbody').append(render)
        })
    }
}

addNew = async () => {
    $('#formData button[type=reset]').click()
    $('#formData .card-header b').html('Add New Data')
    $('#formData [name=nama_matkul]').prop('disabled',false).prop('required',true)
    $('#formData [name=ket]').prop('disabled',false).prop('required',true)
}

showData = async (id_matkul) => {
    $('#wrapperTbMatkul ul#custom-tabs-tbmatkul-tab a#custom-tabs-tbmatkul-form-tab').click()
    $('#formData button[type=reset]').click()
    let config = fetchConfig
    config.method = 'GET'
    const getData = await fetch('/TbMatkul/find/'+id_matkul,config).then((response) => response.json())
    if (getData.result.err != null) {
        alert(getData.result.err)
        console.log(getData.result.err)
    }else{
        $('#formData [name=nama_matkul]').prop('disabled',false).prop('required',true)
        $('#formData [name=ket]').prop('disabled',false).prop('required',true)
        $('#formData .card-header b').html('Show Data '+getData.result.data.nama_matkul)
        $('#formData [name=id_matkul]').val(getData.result.data.id_matkul)
        $('#formData [name=nama_matkul]').val(getData.result.data.nama_matkul)
        $('#formData [name=ket]').val(getData.result.data.ket)
    }
}

deleteData = async (id_matkul) => {
    let config = fetchConfig
    config.method = 'DELETE'
    const deleteData = await fetch('/TbMatkul/delete/'+id_matkul,config).then((response) => response.json())
    if (deleteData.result.err != null) {
        console.log(deleteData.result.err)
        alert(deleteData.result.err)
    }else{
        clearForm()
        callList(true)
    }
}

clearForm = () => {
    $('#formData [name=nama_matkul]').prop('required',false).prop('disabled',true)
    $('#formData [name=ket]').prop('required',false).prop('disabled',true)
    $('#formData .card-header b').html('')
    $('#formData input').val(null)
}

submitForm = async () => {
    let param = {}
    param.id_matkul = $('#formData [name=id_matkul]').val()
    param.nama_matkul = $('#formData [name=nama_matkul]').val()
    param.ket = $('#formData [name=ket]').val()
    let config = fetchConfig
    config.body = JSON.stringify(param)
    config.method = 'POST'
    const fetchForm = await fetch('/TbMatkul/updateOrInsert',config).then((response) => response.json())
    if (fetchForm.result.err != null) {
        console.log(fetchForm.result.err)
        alert(fetchForm.result.err)
    }else{
        callList(true)
        showData(fetchForm.result.data.insertId)
    }
}