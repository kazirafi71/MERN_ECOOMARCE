import {UPDATE_CATEGORY} from './categoryType'

const init={
    category: false,
   
}


const categoryReducer=(state=init,action)=>{
    //console.log(action)
    switch (action.type) {
        case UPDATE_CATEGORY:{
            return {
               
                category: true,
                

            }
        }
        default: return state
    }
}

export default categoryReducer