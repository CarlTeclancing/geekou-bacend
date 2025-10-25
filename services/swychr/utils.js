const custom_request = async (end_point, body, method='get') => {
    method = method.toLowerCase()
    switch(method){
        case 'get':
            fetch(`${process.env.SWYCHR_BASE_URL}/${end_point}` ,{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${process.env.SWYCHR_TOKEN}`
                }
            })
        break;

        case 'post':
            fetch(`${process.env.SWYCHR_BASE_URL}/${end_point}` ,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Bearer ${process.env.SWYCHR_TOKEN}`
                },
                body:JSON.stringify(body)
            })
        break;
    }
}

module.exports = custom_request