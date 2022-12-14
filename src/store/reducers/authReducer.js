const initialState = {
  isLoggedIn: false,
  domain: "",
  id: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        domain: action.data.domain,
        id: action.data.id
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        domain: "",
        id: ""
      };
    default:
      return state;
  }
};

export default authReducer;
