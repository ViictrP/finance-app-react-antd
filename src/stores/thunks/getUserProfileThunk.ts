import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib';
import { UserDTO } from '../../dto';
import { notification } from 'antd';

const getUserProfileThunk = createAsyncThunk(
  'get/userProfile',
  async (_, thunkApi) => {
    try {
      const response = await api.get<UserDTO>('/me');
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(
        '[getUserProfile] an error ocurred while trying to get logged user profile',
        error
      );
      notification.error({
        message: 'Erro ao buscar perfil',
        description:
          'Não foi possível obter o perfil do usuário. Tente novamente mais tarde.',
      });
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default getUserProfileThunk;
