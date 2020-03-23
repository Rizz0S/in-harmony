let initialState = {
  user: {
    username: "",
    id: 0,
    user_palettes: [],
    liked_palettes: []
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

      case "ADD_USER_PALETTE":
        return{
          ...state,
          user: {...state.user, user_palettes: [...state.user.user_palettes, action.payload]}
        }
      
      case "LIKE_PALETTE":
        return{
          ...state,
          user: {...state.user, liked_palettes: [...state.user.liked_palettes, action.payload]}
        }
      
      case "UNLIKE_PALETTE":
        const updatedLikedPalettes = state.user.liked_palettes.filter((palette) => palette.id !== action.payload.id);
        return{
          ...state,
          user: {...state.user, liked_palettes: updatedLikedPalettes}
        }
  
      default:
        return state
    }
  }
  
  export default userReducer