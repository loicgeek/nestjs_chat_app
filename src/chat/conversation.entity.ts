import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ColumnType,
  CreateDateColumn,
} from 'typeorm';
import { ParseIntPipe } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Column()
  content: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: null,
  })
  readAt: Date;

  @Column({
    default: false,
  })
  deleted: boolean;
}
