import UserDTO from './user.dto.ts';

export default interface RecurringExpenseDTO {
  id: string;
  description: string;
  amount: number;
  createdAt: Date;
  user: UserDTO;
  category: string;
  deleted: boolean;
  deleteDate?: Date;
}
