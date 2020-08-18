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
    const query = this.createQueryBuilder('developer')
        .leftJoinAndSelect(
          'developer.programming_languages',
          'programming_language',)
        .leftJoinAndSelect(
          'developer.languages',
          'language');

    const queries = [];
    const options: any = {};

    programming_language && (queries.push(`programming_language.name = :name`), options.name = programming_language);
    language && (queries.push(`language.code = :code`), options.code = language);

    queries.length && query.where(queries.join(' AND '), options);
    offset && query.skip(offset);
    limit && query.take(limit);

    return query.getMany();
  }
}
