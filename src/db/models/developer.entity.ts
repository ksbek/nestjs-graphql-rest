import { Field, ObjectType } from 'type-graphql';
import { 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm';
import { ProgrammingLanguage } from './programming_language.entity';
import { Language } from './language.entity';

@ObjectType()
@Entity({name: 'developers'})
export class Developer extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  // Associations
  @ManyToMany(() => ProgrammingLanguage)
  @JoinTable()
  programming_languages: ProgrammingLanguage[];

  @ManyToMany(() => Language)
  @JoinTable()
  languages: Language[];

  static searchDevelopers(programming_language: string, language: string, offset: number, limit: number) : Promise<Developer[]> {
    let query = this.createQueryBuilder('developer')
        .leftJoinAndSelect(
          'developer.programming_languages',
          'programming_language',)
        .leftJoinAndSelect(
          'developer.languages',
          'language');

    if (programming_language && language) {
      query = query
        .where('programming_language.name = :name AND language.code = :code ', { name: programming_language, code: language })
    } else if (programming_language) {
      query = query
        .where('programming_language.name = :name', { name: programming_language })
    } else if (language) {
      query = query
        .where('language.code = :code', { code: language })
    }

    if (offset) {
      query = query.skip(offset);
    }

    if (limit) {
      query = query.take(limit);
    }

    return query.getMany();
  }
}
