import { Customer } from '../entities/customer';

export interface CustomerRepository {
  create(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  findByPhone(phone: string): Promise<Customer | null>;
}