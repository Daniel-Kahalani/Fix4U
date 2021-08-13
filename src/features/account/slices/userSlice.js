import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  // return generalUser
  //   ? await Parse.Cloud.run('getUserDataByGeneraUser', {
  //       generalUser: JSON.stringify(generalUser),
  //     })
  //   : null;

  const data = generalUser
    ? await Parse.Cloud.run('getUserDataByGeneraUser', {
        generalUser: JSON.stringify(generalUser),
      })
    : null;
  console.log('isloggedIn', data);
  return data;
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const generalUser = await Parse.User.logIn(email, password);
      const userInfo = await Parse.Cloud.run('getUserDataByGeneraUser', {
        generalUser: JSON.stringify(generalUser),
      });
      console.log('login:', userInfo);

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
  console.log('register', userInfo);
  return userInfo;
});

export const logout = createAsyncThunk('user/logout', async () => {
  return await Parse.User.logOut();
});

export const savePhoto = createAsyncThunk(
  'user/savePhoto',
  async (photo, { getState }) => {
    const { user } = getState();
    await AsyncStorage.setItem(`${user.info.username}-photo`, photo.uri);
    return photo.uri;
  }
);

export const loadPhoto = createAsyncThunk(
  'user/loadPhoto',
  async (_, { getState }) => {
    const { user } = getState();
    const photoUri = await AsyncStorage.getItem(`${user.info.username}-photo`);
    return photoUri;
  }
);

export const updatePersonalInfo = createAsyncThunk(
  'user/updatePersonalInfo',
  async (userInput, { getState }) => {
    const { user } = getState();
    const userInfo = await Parse.Cloud.run('updatePersonalInfo', {
      ...userInput,
      specificUserId: user.info.specificUserId,
      generalUserId: user.info.generalUserId,
    });
    console.log('updatePersonalInfo', userInfo);
    return userInfo;
  }
);

export const updateBusinessInfo = createAsyncThunk(
  'user/updateBusinessInfo',
  async (userInput, { getState }) => {
    const { user } = getState();
    const userInfo = await Parse.Cloud.run('updateBusinessInfo', {
      ...userInput,
      specificUserId: user.info.specificUserId,
      generalUserId: user.info.generalUserId,
    });
    console.log('updateBusinessInfo', userInfo);
    return userInfo;
  }
);

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
      state.error = null;
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
      state.error = null;
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
    [savePhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
    [loadPhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
    [updatePersonalInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePersonalInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.error = null;
    },
    [updatePersonalInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateBusinessInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBusinessInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.error = null;
    },
    [updateBusinessInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;

/*
info structure

--------customer-------------
Object {
  "address": String,
  "email": String,
  "fullName": String,
  "generalUserId": String,
  "phone": String,
  "specificUserId": String,
  "userType": String,
  "username": String,
}

-----------rsp-------------
Object {
  "businessAddress": String,
  "businessName": String,
  "email": String,
  "expertise": Array [],
  "fullName": String,
  "generalUserId": String,
  "phone": String,
  "specificUserId": String,
  "userType": String,
  "username": String,
  "visitCost": Number,
}

*/
