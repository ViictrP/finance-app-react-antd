import UserDTO from './user.dto.ts';

export default interface MonthClosureDTO {
  id: string;
  month: string;
  year: number;
  user: UserDTO;
  total: number;
  available: number;
  expenses: number;
  deleted: boolean;
  deleteDate: Date;
  createdAt: Date;
  index?: number;
}
