const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");
const redux_thunk = require("redux-thunk").default;

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAIL = "FETCH_FAIL";

const initialValues = {
  type: "",
  loading: false,
  data: [],
  error: "",
};
function FetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

function FetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
}

function FetchFail(error) {
  return {
    type: FETCH_FAIL,
    payload: error,
  };
}

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
};

const fetchFunction = () => {
  return function (dispatch) {
    dispatch(FetchRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        let userName = data.data.map((e) => e.name);
        dispatch(FetchSuccess(userName));
      })
      .catch((error) => {
        dispatch(FetchFail(error));
      });
  };
};

const store = createStore(reducer, applyMiddleware(redux_thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchFunction());
