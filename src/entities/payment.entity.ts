import {
  BaseEntity, Column, CreateDateColumn, Entity,
  Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import Tickets from "./ticket.entity";

export enum PaymentStatus {
  Pending = 0,
  Failed = 1,
  Success = 2
}

@Entity("payments")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  // since we are dealing with money, amount would be in the cent value (kobo)
  @Column() amount: number;

  // when a ticket is deleted, the referenced column would be set to null
  @Column() ticketId: string;
  @ManyToOne(() => Tickets, { onDelete: "SET NULL", onUpdate: "SET NULL" })
  @Index() ticket: Tickets;

  // tinyint only uses 1byte
  @Column({ type: "tinyint", default: PaymentStatus.Pending })
  paymentStatus: PaymentStatus;

  // timestamps
  @CreateDateColumn() createdOn: Date;
  @UpdateDateColumn() updatedOn: Date;
}