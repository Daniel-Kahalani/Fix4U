import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
const initialState = {
  info: {},
  isAuthenticated: null,
  photo: null,
  error: null,
  loading: null,
};

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
  const generalUser = await Parse.User.currentAsync();
  return generalUser
    ? await Parse.Cloud.run('getUserDataByGeneraUser', {
        generalUser: JSON.stringify(generalUser),
      })
    : null;
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const generalUser = await Parse.User.logIn(email, password);

      const userInfo = await Parse.Cloud.run('getUserDataByGeneraUser', {
        generalUser: JSON.stringify(generalUser),
      });
      return userInfo;
    } catch (e) {
      if (e.code === 101) {
        throw new Error('Invalid email/password.');
      }
      return e;
    }
  }
);

export const register = createAsyncThunk('user/register', async (userInput) => {
  const userInfo = await Parse.Cloud.run('register', { ...userInput });
  return userInfo;
});

export const logout = createAsyncThunk('user/logout', async () => {
  return await Parse.User.logOut();
});

// export const savePhoto = createAsyncThunk(
//   'user/savePhoto',
//   async (photo, { getState }) => {
//     const { user } = getState();
//     await AsyncStorage.setItem(`${user.info.username}-photo`, photo.uri);
//     return photo.uri;
//   }
// );

// export const loadPhoto = createAsyncThunk(
//   'user/loadPhoto',
//   async (_, { getState }) => {
//     const { user } = getState();
//     const photoUri = await AsyncStorage.getItem(`${user.info.objectId}-photo`);
//     return photoUri;
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [isLoggedIn.fulfilled]: (state, action) => {
      if (action.payload) {
        state.info = action.payload;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    [isLoggedIn.rejected]: (state, action) => {
      state.isAuthenticated = false;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = state.isAuthenticated;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = state.isAuthenticated;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.info = initialState.info;
      state.photo = initialState.photo;
      state.isAuthenticated = false;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
    // [savePhoto.fulfilled]: (state, action) => {
    //   state.photo = action.payload;
    // },
    // [loadPhoto.fulfilled]: (state, action) => {
    //   state.photo = action.payload;
    // },
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
