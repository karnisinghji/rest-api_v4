import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  mobile_number: string;

  @OneToMany(() => Order, (order) => order.customer, { cascade: ['remove'] })

  //@OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
