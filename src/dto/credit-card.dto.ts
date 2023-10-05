import UserDTO from './user.dto.ts';
import InvoiceDTO from './invoice.dto.ts';

export default interface CreditCardDTO {
  id: string;
  title: string;
  description: string;
  number: string;
  user: UserDTO;
  invoices: InvoiceDTO[];
  invoiceClosingDay: number;
  createAt: Date;
  backgroundColor: string;
  deleted: boolean;
  deleteDate?: Date;
}
