import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { LanguageCode } from '../../enums/language_code';

@ObjectType()
@Entity({ name: 'languages' })
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: LanguageCode;
}
