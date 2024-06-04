export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetcing: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetcing: true,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetcing: false,
        error: action.payload,
      };
    
      default:
        return state;
  }
};
