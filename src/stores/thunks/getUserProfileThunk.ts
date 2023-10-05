import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib';
import { UserDTO } from '../../dto';

const getUserProfileThunk = createAsyncThunk(
  'get/userProfile',
  async (_, thunkApi) => {
    try {
      console.log('getting user profile {}', axios.defaults.headers.common);
      const response = await api.get<UserDTO>('/me', {
        headers: axios.defaults.headers.common,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(
        '[getUserProfile] an error ocurred while trying to get logged user profile',
        error
      );
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default getUserProfileThunk;
