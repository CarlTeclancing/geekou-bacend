const custom_request = require("./utils");


// Card related services
// card creation
export const purchaseVirtualCard =  async (data) => {
    try{
        const {user_id, card_type, amount} = data
        if(!user_id || !card_type || !amount){
            throw new Error("All fields required")
        }
        const response = await custom_request('/vcard_purchase_card', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }
}

// const get all user's card
export const getUserVirtualCard = async (data) => {
    try{
        const {user_id} = data
        if(!user_id ){
            throw new Error("User id required")
        }
        const response = await custom_request('/get_all_virtual_card', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }
}

// get virtual card details
export const getVirtualCardDetails = async(data) => {
    try{
        const {card_id} = data
        if(!card_id ){
            throw new Error("card id required")
        }
        const response = await custom_request('/get_virtual_card_details', data, 'post')
        const res = await response.json()
        return res;

    }
    catch(e){
        console.log(e.message);
    }    
}


// recharge virtual card
export const rechargeVirtualCard = async (data) => {
    try{
        const {card_id, amount} = data
        if(!card_id || !amount ){
            throw new Error("fields required")
        }
        const response = await custom_request('/recharge_vcard', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}


// Withdraw funds
export const withdrawFunds = async(data) => {
    try{
        const {card_id, amount} = data
        if(!card_id || !amount ){
            throw new Error("fields required")
        }
        const response = await custom_request('/withdraw_fund', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}

// Temporally freeze virtual card
export const freezeVirtualCard = async(data) => {
    try{
        const {card_id} = data
        if(!card_id  ){
            throw new Error("fields required")
        }
        const response = await custom_request('/freeze_card', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}


// temporally unfreeze virtual card
export const unFreezeVirtualCard = async (data) => {
    try{
        const {card_id} = data
        if(!card_id ){
            throw new Error("fields required")
        }
        const response = await custom_request('/unfreeze_card', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}

// permantly block card
export const blockCard = async (data) => {
    try{
        const {card_id} = data
        if(!card_id ){
            throw new Error("fields required")
        }
        const response = await custom_request('/block_card', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}

// getting the transactions made by a card
export const getCardTransaction = async (data) => {
    try{
        const {card_id} = data
        if(!card_id ){
            throw new Error("fields required")
        }
        const response = await custom_request('/get_card_transactions', data, 'post')
        const res = await response.json()
        return res;
    }
    catch(e){
        console.log(e.message);
    }    
}