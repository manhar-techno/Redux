const redux = require("redux");
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const cakeOrder = "cake_order";
const icecreamOrder = "icecream_order";

const logger = reduxLogger.createLogger();
//one

const initialValues = {
  numberOfCakes: 0,
  quantity: 0,
  name: "",
};

const actionCreator = () => {
  return {
    type: cakeOrder,
  };
};

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case cakeOrder:
      return { ...state, quantity: state.quantity + 1 };

    default:
      return state;
  }
};

//two

const initialValues1 = {
  numberOfIcecream: 0,
  quantity: 0,
  name: "",
};

const actionCreator2 = () => {
  return {
    type: icecreamOrder,
  };
};

const reducer2 = (state = initialValues1, action) => {
  switch (action.type) {
    case icecreamOrder:
      return { ...state, quantity: state.quantity + 1 };

    default:
      return state;
  }
};

const rootReducer = combineReducer({ cake: reducer, iceCream: reducer2 });
const store = redux.createStore(rootReducer, applyMiddleware(logger));
// store.subscribe(() => console.log(store.getState()));

store.dispatch(actionCreator());
store.dispatch(actionCreator2());
//hoi
