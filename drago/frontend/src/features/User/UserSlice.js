import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Inside, createAsyncThunk will generate three `action creators` and action types,
 * and returns a thunk action creator that automatically dispatches those actions
 * when called.
 *
 * signupUser.pending: users/signupUser/pending
 * signupUser.fulfilled: users/signupUser/fulfilled
 * signupUser.rejected: users/signupUser/rejected
 *
 * createAsyncThunk returns a standard Redux thunk action creator (i.e. a function).
 * The thunk action creator function will have plain action creators for the `pending`
 * `fulfilled`, and `rejected` cases attached as nested fields.
 *
 * The thunks generated by createAsyncThunk will always return a resolved promise
 * with either the fulfilled action object or rejected action object inside, as
 * appropriate. [See `unwrapResult`].
 */
export const signupUser = createAsyncThunk(
  "users/signupUser", // a string that will be used as the prefix for the generated action types
  async (arg, thunkAPI) => {
    //a "payloadCreator" callback function that should return a Promise
    // arg: a single value, containing the first parameter that was passed to the thunk action creator when it was dispatched.
    const { username, email, password } = arg;
    try {
      // make api request
      //   const response = await fetch("http://localhost:3001/users", {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      // capture response data
      const data = await response.json();

      if (response.status === 200) {
        console.log("success");
        // success
        localStorage.setItem("token", data.token);
        return { ...data, username: username };
      } else {
        // fail
        console.log("fail" + data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      // bad request
      console.log("Error");
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

/**
 * RTK has a createSlice API that will help us simplify our Redux reducer
 * logic and actions.
 *
 * createSlice does several important things for us:
 *      - We can write the case reducers as functions inside of an object,
 *      instead of having to write a switch/case statement
 *      - The reducers will be able to write shorter immutable update logic
 *      - All the action creators will be generated automatically based on
 *      the reducer functions we've provided
 */
export const userSlice = createSlice({
  name: "user", // a string that will be used as the prefix for generated action types
  initialState: {
    //the initial state of the reducer
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    // standard reducer logic, with auto-generated `action creators`
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    /**
     * To handle createAsyncThunk `nested` action creators, reference
     * these action creators inside createSlice using the object key
     * notation (using `computed property names`) or the "builder callback"
     * notation.
     */

    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload; // modify
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("fulfilled, payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.email = payload.user.email;
      state.username = payload.user.name;
    },
  },
});

/* export selector used to access redux state*/
export const userSelector = (state) => state.user;

/* export action creator used to dispatch action */
export const { clearState } = userSlice.actions;

/* export combinedReducers used for store setup */
export default userSlice.reducer;
