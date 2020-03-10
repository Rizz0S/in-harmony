let initialState = {
  user: {
    username: "",
    id: 0,
    palettes: []
  },
  token: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case "SET_USER":
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token
        }
  
    //   case "ADD_PALETTE":
    //       return {
    //         ...state,
    //         user: {
    //           ...state.user,
    //           palettes: [...state.user.palettes, action.payload]
    //         }
    //       }
  
      default:
        return state
    }
  }
  
  export default userReducer