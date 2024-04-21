import {
  BaseEntity, Column, CreateDateColumn, Entity,
  Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import Tickets from "./ticket.entity";

@Entity("payments")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;

  // since we are dealing with money, amount would be in the cent value (kobo)
  @Column() amount!: number;

  // when a ticket is deleted, the referenced column would be set to null
  @Column() ticketId!: string;
  @ManyToOne(() => Tickets, { onDelete: "SET NULL", onUpdate: "SET NULL" })
  @Index() ticket?: Tickets;

  @Column() uniquePaymentReference!: string;

  // timestamps
  @CreateDateColumn() createdOn!: Date;
  @UpdateDateColumn() updatedOn!: Date;
}