import { AddCpfModel } from '../../domain/models/add-cpf';
import { AddCpfResultModel } from '../../domain/models/add-cpf-result';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('cpf')
export class CpfEntity implements AddCpfModel, AddCpfResultModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 14 })
  cpf: string;

  @CreateDateColumn()
  createdAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
