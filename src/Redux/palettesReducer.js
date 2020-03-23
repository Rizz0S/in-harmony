// import { act } from "react-dom/test-utils"

let initialState = {
  all: []
}


let palettesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PALETTES":
      return {
        ...state,
        all: action.payload
    }

    case "ADD_PALETTE":
      return{
        ...state,
        all: [...state.all, action.payload]
    }

    case "UPDATE_LIKES":
      const idx = state.all.findIndex((palette) => palette.id === action.payload.palette.id);
      const foundPalette = {...state.all[idx]};
      foundPalette.num_likes += action.payload.num;
      return{
        ...state,
        all: [...state.all.slice(0, idx), foundPalette, ...state.all.slice(idx+1)]
    }

    default:
      return state
  }
}

export default palettesReducer