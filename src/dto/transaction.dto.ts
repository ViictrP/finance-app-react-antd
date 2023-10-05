import UserDTO from './user.dto.ts';
import InvoiceDTO from './invoice.dto.ts';

export default interface TransactionDTO {
  id: string;
  amount: number;
  description: string;
  isInstallment: boolean;
  installmentAmount: number;
  installmentNumber: number;
  installmentId?: string;
  createdAt: Date;
  date: Date;
  invoice?: InvoiceDTO;
  user: UserDTO;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other';
  deleted: boolean;
  deleteDate?: Date;
}
