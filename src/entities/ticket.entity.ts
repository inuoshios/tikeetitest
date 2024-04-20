import {
  BaseEntity, Column, CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

export enum TicketStatus {
  Reserved = 0,
  Completed = 1
}

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column() email: string;

  @Column() fullName: string;

  @Column() uniqueIdentifier: string;

  // tinyint only uses 1byte
  @Column({ type: "tinyint", default: TicketStatus.Reserved })
  status: TicketStatus;

  // timestamps
  @CreateDateColumn() createdOn: Date;
  @UpdateDateColumn() updatedOn: Date;
}