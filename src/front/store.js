export const initialStore=()=>{
  return{
    userData: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'ADD_DATA':
      return {
        userData: action.payload
      };
    
    case "RESET_DATA":
      return {
        userData: null
      };
      
    default:
      throw Error('Unknown action.');
  }    
}
