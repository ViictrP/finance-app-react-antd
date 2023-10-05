import UserDTO from './user.dto.ts';

export type LoginDTO = Omit<UserDTO, 'id' | 'name' | 'salary'>;
