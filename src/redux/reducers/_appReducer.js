const intialState = {
    user:null,
    dropdown:false,
    modal:false,
    works:null

 }
 
 export default function AppReducer(state=intialState,action){
    switch(action.type){
        case "SET_USER":{
            return{
               ...state,
               user:action.user
            }
         }

         case "SET_WORKS":{
            return{
               ...state,
               works:action.works
            }
         }

         case "SET_DROPDOWN":{
            return{
               ...state,
               dropdown:action.dropdown
            }
         }

         case "SET_MODAL":{
            return{
               ...state,
               modal:action.modal
            }
         }

        
 
       
 
       default:
          return state
    }
 }