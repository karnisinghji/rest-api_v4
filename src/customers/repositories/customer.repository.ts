import { Customer } from '@/customers/entities/customer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
