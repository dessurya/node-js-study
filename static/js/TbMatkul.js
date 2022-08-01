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
    callList()
})

callList = async () => {
    $('#listData table tbody').html('')
    let param = {}
    let config = fetchConfig
    config.body = null
    config.method = 'GET'
    const getList = await fetch('/TbMatkul/paginate',config).then((response) => response.json())
    getList.result.data.forEach(data => {
        let render = ''
        render += '<tr>'
        render += '<td>'
        render += '<div class="btn-group" role="group" aria-label="tools">'
        render += '<span onclick="showData('+data.id_matkul+')" class="btn btn-block btn-sm btn-outline-info">Open</span>'
        render += '<span onclick="deleteData('+data.id_matkul+')" class="btn btn-block btn-sm btn-outline-danger">Delete</span>'
        render += '</div>'
        render += '</td>'
        render += '<td>'+data.id_matkul+'</td>'
        render += '<td>'+data.nama_matkul+'</td>'
        render += '<td>'+data.ket+'</td>'
        render += '</tr>'
        $('#listData table tbody').append(render)
    })
}

showData = async (id_matkul) => {
    let config = fetchConfig
    config.method = 'GET'
    const getData = await fetch('/open-data/'+id_matkul,config).then((response) => response.json())
    alert(getData.msg)
    if (getData.res) { 
        $('form [name=id_matkul]').val(getData.data.id_matkul)
        $('form [name=kode]').val(getData.data.kode)
        $('form [name=tipe]').val(getData.data.tipe)
    }
}

deleteData = async (id_matkul) => {
    let config = fetchConfig
    config.method = 'DELETE'
    const deleteData = await fetch('/delete-data/'+id_matkul,config).then((response) => response.json())
    alert(deleteData.msg)
    if (deleteData.res) { 
        $('#formData button[type=reset]').click()
        callList()
    }
}

clearForm = () => {
    $('form input').val(null)
}

submitForm = async () => {
    let param = {}
    param.id_matkul = $('form [name=id_matkul]').val()
    param.kode = $('form [name=kode]').val()
    param.tipe = $('form [name=tipe]').val()
    let config = fetchConfig
    config.body = JSON.stringify(param)
    config.method = 'POST'
    const fetchForm = await fetch('/store',config).then((response) => response.json())
    console.log(fetchForm)
    alert(fetchForm.msg)
    if (fetchForm.res) { 
        $('#formData button[type=reset]').click()
        callList()
    }
}