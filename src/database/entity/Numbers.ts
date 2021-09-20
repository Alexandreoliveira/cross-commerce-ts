import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Numbers' }) // table name in database
export class Numbers extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column() 
  pagina: number;

  @Column({ type: 'decimal', precision: 12, scale: 8}) 
  valor: number;

}