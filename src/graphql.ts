/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface DeveloperSearchInput {
  programming_language?: string;
  language?: string;
  offset?: number;
  limit?: number;
}

export interface ProgrammingLanguage {
  id: number;
  name: string;
}

export interface Language {
  id: number;
  code: string;
}

export interface Developer {
  id: number;
  email: string;
  programming_languages?: ProgrammingLanguage[];
  languages?: Language[];
}

export interface IQuery {
  searchDevelopers(
    input?: DeveloperSearchInput,
  ): Developer[] | Promise<Developer[]>;
}
