import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { UserDTO } from '../../dto';
import getUserProfileThunk from '../thunks/getUserProfileThunk.ts';
import { useSelector } from 'react-redux';

export interface AuthUser {
  email?: string | null;
  photoUrl?: string | null;
  name?: string | null;
}

interface UserSlice {
  profile?: UserDTO;
  authUser?: AuthUser;
  isLoadingProfile: boolean;
}

const initialState: UserSlice = {
  isLoadingProfile: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoadingProfile: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProfile = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.isLoadingProfile = true;
    });

    builder.addCase(
      getUserProfileThunk.fulfilled,
      (state, action: PayloadAction<UserDTO>) => {
        state.profile = action.payload;
        state.isLoadingProfile = false;
      }
    );

    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.profile = undefined;
      state.isLoadingProfile = false;
    });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const useUserSelector = () => useSelector(selectUser);
export const userApiActions = {
  getUserProfileThunk,
};
export default userSlice.reducer;
