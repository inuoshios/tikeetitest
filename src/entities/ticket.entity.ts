import {
  BaseEntity, Column, CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

export enum TicketStatus {
  Pending = 0,
  Completed = 1,
  Expired = 2
}

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id!: string;

  @Column() email!: string;

  @Column() fullName!: string;

  @Column() uniqueIdentifier!: string;

  @Column({ type: "smallint", default: TicketStatus.Pending })
  status!: TicketStatus;

  @Column() expiresAt!: Date;

  // timestamps
  @CreateDateColumn() createdOn!: Date;
  @UpdateDateColumn() updatedOn!: Date;
}