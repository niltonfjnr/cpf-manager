import { AddCpfModel } from '../../domain/models/add-cpf';
import { AddCpfResultModel } from '../../domain/models/add-cpf-result';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('cpf')
export class CpfEntity implements AddCpfModel, AddCpfResultModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 11 })
  cpf: string;

  @CreateDateColumn()
  createdAt: string;
}