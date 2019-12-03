import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcriptjs from 'bcryptjs';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  username: string;

  @Column()
  @ApiModelProperty()
  email: string;

  @Column()
  @ApiModelProperty()
  country: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcriptjs.hash(password, this.salt);
    return hash === this.password;
  }

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
