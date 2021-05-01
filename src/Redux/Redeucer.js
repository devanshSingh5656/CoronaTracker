export const initialState = {
  data: [],
  LineData:[]
  
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      return {
          ...state,
        data: action.item,
      };
    }
    case "LineData":{
        return{
            ...state,
            LineData:action.item
        }
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
export default Reducer;
