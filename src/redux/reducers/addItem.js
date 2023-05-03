const addItem = [];

const addItems = (state = addItem, action) => {
  switch (action.type) {
    case "ADDITEM":
      return [...state, action.payload];

    case "DELITEM":
      return (state = state.filter((x) => {
        return x.id !== action.payload.id;
      }));

    case "UPDITEM":
      return [...action.payload]

    default:
      return state;
  }
};

export default addItems;
