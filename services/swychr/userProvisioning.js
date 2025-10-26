const custom_request = require("./utils")

// User related services
// user creation
const createUser = async (data) => {
    try{
        const {email ,name ,country} = data
        if(!email || !name ||!country){
            throw new Error("All fields required")
        }

        const response = await custom_request('user' ,data ,'post')
        const res = await response.json()
        console.log(res);
        return res;

    }
    catch(e){
        console.log(e.message);
    }
}

// Update user (add kyc info)
const updateUser =async (data) => {
    try{
        const {user_id, dob, mobile, mobile_code, gender, address, street, city, postal_code, country, country_iso_code, id_proof_type, id_proof_no, id_proof_expiry_date, id_proof_url_list, livelyness_img} = data
        if(!user_id || !dob || !mobile ||!mobile_code ||!gender ||!address || !street || !city || postal_code || !country || !country_iso_code || !id_proof_type || !id_proof_no || !id_proof_expiry_date || !id_proof_url_list || !livelyness_img ){
            throw new Error("All fields required")
        }

        const response = await custom_request('update_user', data, 'post')
        const res = await response.json()
        return res;

    }
    catch(e){
        console.log(e.message);
    }
}

// User creation with kyc
const createUserWithKyc = async(data) => {
    try{
        const { email, name, dob, mobile, mobile_code, gender, address, street, city, postal_code, country, country_iso_code, id_proof_type, id_proof_no, id_proof_expiry_date, id_proof_url_list, livelyness_img} = data
        
        const response = await custom_request('create_full_user', data, 'post')
        const res = await response.json()
        console.log(response);
        
        return res;

    }
    catch(e){
        console.log(e.message);
    }    
}

// Check user validaity for virtual card creation
const checkUserValidity = async (data) => {
    try{
        const {user_id} = data
        if(!user_id){ throw new Error("No user id") }
        const response = await custom_request('check_user_validity', data, 'post')
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports = {createUser ,createUserWithKyc ,updateUser, checkUserValidity}