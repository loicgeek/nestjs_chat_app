import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ColumnType,
  CreateDateColumn,
} from 'typeorm';
import { ParseIntPipe } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  content: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  senderId: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty()
  receiverId: number;

  @Column({
    type: 'varchar',
    default: new Date().toISOString(),
  })
  @ApiModelProperty()
  createdAt: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  @ApiModelProperty()
  readAt: string;

  // @Column({
  //   default: null,
  // })
  // deleted: boolean;
}
