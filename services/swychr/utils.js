const custom_request = async (end_point, body, method='get') => {
    method = method.toLowerCase()
    switch(method){
        case 'get':
            console.log("============================");
            console.log("sending a GET request to : ", `${process.env.PAYMENT_GATEWAY_BASE_URL}/${end_point}`);
            console.log("============================");
            
            return fetch(`${process.env.PAYMENT_GATEWAY_BASE_URL}/${end_point}` ,{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${process.env.SWYCHR_TOKEN}`
                }
            })
        break;

        case 'post':
            console.log("============================");
            console.log("sending a POST request to : ", `${process.env.PAYMENT_GATEWAY_BASE_URL}/${end_point}`);
            console.log("============================");

            return fetch(`${process.env.PAYMENT_GATEWAY_BASE_URL}/${end_point}` ,{
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