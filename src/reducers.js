export const numberOfClicksReducer = (state = 0, action) => {
  const { type } = action;

  switch (type) {
    case 'COUNTER_BUTTON_CLICKED': {
      const amount = action.payload;
      return state + amount;
    }
    default:
      return state;
  }
};
