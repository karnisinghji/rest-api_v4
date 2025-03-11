import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,JoinTable,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

export enum OrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  //@ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'SET NULL',})
  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  customer: Customer;

  //@ManyToOne(() => Product, (product) => product.orders, { eager: true })
  @ManyToMany(() => Product, (product) => product.orders, { eager: true })
  @JoinTable()
  products: Product[];

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}
