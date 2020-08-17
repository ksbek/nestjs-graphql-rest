import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm';
import { ProgrammingLanguageName } from '../../enums/programming_language'

@ObjectType()
@Entity({name: 'programming_languages'})
export class ProgrammingLanguage extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: ProgrammingLanguageName;
}
