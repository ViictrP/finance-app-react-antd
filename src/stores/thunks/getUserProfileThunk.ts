import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api.ts';
import { UserDTO } from '../../dto';
import { notification } from 'antd';
import { AxiosError } from 'axios';

const getUserProfileThunk = createAsyncThunk(
  'get/userProfile',
  async (_, thunkApi) => {
    try {
      const response = await api.get<UserDTO>('/me');
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: unknown) {
      console.log(
        '[getUserProfile] an error ocurred while trying to get logged user profile',
        error
      );
      if ((error as AxiosError).response?.status === 401) {
        notification.error({
          message: 'Erro ao buscar perfil',
          description: 'Sua sessão expirou.',
        });
      } else {
        notification.error({
          message: 'Erro ao buscar perfil',
          description:
            'Não foi possível obter o perfil do usuário. Tente novamente mais tarde.',
        });
      }
      return thunkApi.rejectWithValue({});
    }
  }
);

export default getUserProfileThunk;
