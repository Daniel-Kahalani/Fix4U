import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { getPushToken } from '../../../infrastructure/utils/getPushToken';
const initialState = {
  info: {},
  isAuthenticated: null,
  photo: null,
  error: null,
  loading: null,
};

/**********Account Feature***********/

export const register = createAsyncThunk(
  'user/register',
  async (userInput, { rejectWithValue }) => {
    try {
      let pushToken;
      pushToken = await getPushToken();
      const userInfo = await Parse.Cloud.run('register', {
        ...userInput,
        pushToken,
      });
      return userInfo;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const pushToken = await getPushToken();
      let generalUser = await Parse.User.logIn(email.toLowerCase(), password);
      if (pushToken && !generalUser.get('pushTokens').includes(pushToken)) {
        const { pushTokens } = generalUser.attributes;
        generalUser.set({ pushTokens: [...pushTokens, pushToken] });
        await generalUser.save();
      }
      const userInfo = await Parse.Cloud.run('getUserDataByGeneraUser', {
        generalUser: JSON.stringify(generalUser),
      });
      return userInfo;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  'user/isLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const generalUser = await Parse.User.currentAsync();
      const userInfo = generalUser
        ? await Parse.Cloud.run('getUserDataByGeneraUser', {
            generalUser: JSON.stringify(generalUser),
          })
        : null;
      return userInfo;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

/**********Setting Feature***********/

export const updatePersonalInfo = createAsyncThunk(
  'user/updatePersonalInfo',
  async (userInput, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const userInfo = await Parse.Cloud.run('updatePersonalInfo', {
        ...userInput,
        specificUserId: user.info.specificUserId,
        generalUserId: user.info.generalUserId,
      });
      return userInfo;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const updateBusinessInfo = createAsyncThunk(
  'user/updateBusinessInfo',
  async (userInput, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const userInfo = await Parse.Cloud.run('updateBusinessInfo', {
        ...userInput,
        specificUserId: user.info.specificUserId,
        generalUserId: user.info.generalUserId,
      });
      return userInfo;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

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

export const logout = createAsyncThunk('user/logout', async () => {
  return await Parse.User.logOut();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.error = null;
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
      state.isAuthenticated = false;
      state.error = {
        message:
          action.payload.code === 202
            ? 'there is already an account with this email'
            : action.payload.message,
        code: action.payload.code,
      };
    },
    [login.pending]: (state, action) => {
      state.error = null;
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

      state.error = {
        message:
          action.payload.code === 101
            ? 'invalid email/password'
            : action.payload.code === 200
            ? 'email is required'
            : action.payload.message,
        code: action.payload.code,
      };
      state.isAuthenticated = false;
    },
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
    [updatePersonalInfo.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [updatePersonalInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
    },
    [updatePersonalInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message:
          action.payload.code === 202
            ? 'there is already an account with this email'
            : action.payload.message,
        code: action.payload.code,
      };
    },
    [updateBusinessInfo.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [updateBusinessInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
    },
    [updateBusinessInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [savePhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
    [loadPhoto.fulfilled]: (state, action) => {
      state.photo = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      state.info = initialState.info;
      state.photo = initialState.photo;
      state.isAuthenticated = false;
      state.error = initialState.error;
      state.loading = initialState.loading;
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
  "pushTokens": Array[String],
  "specificUserId": String,
  "userType": String,
  "username": String,
}

-----------rsp-------------
Object {
  "businessAddress": String,
  "businessName": String,
  "email": String,
  "expertise": Array [String],
  "fullName": String,
  "generalUserId": String,
  "phone": String,
  "pushTokens": Array[String],
  "rating": Number,
  "votes": Number,
  "specificUserId": String,
  "userType": String,
  "username": String,
  "visitCost": Number,
}

*/
