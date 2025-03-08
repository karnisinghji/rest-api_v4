import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /*   @Column({
    type: 'decimal',
    precision: 10, // Maximum total digits
    scale: 2, // Digits after decimal point
    transformer: {
      to: (value: number) => value.toFixed(2), // Ensure decimal format
      from: (value: string) => parseFloat(value), // Convert from string to float
    },
  }) */
  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Order, (order) => order.product)
  @JoinTable() // This is required in one of the entities
  orders: Order[];
}
