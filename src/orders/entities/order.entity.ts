import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';



export enum OrderStatus{
  PENDING= 'pending',
  SHIPPED= 'shipped',
  DELIVERED= 'delivered',
  CANCELLED= 'cancelled'
}



@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.orders, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}
