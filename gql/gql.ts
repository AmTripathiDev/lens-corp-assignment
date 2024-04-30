/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation CreateNewEmployee($employee: createEmployee!) {\n        createNewEmployee(employee: $employee) {\n          name\n          email\n          LinkedinProfile\n          aadharNumber\n          ProfileImageUrl\n        }\n    }\n": types.CreateNewEmployeeDocument,
    "#graphql\nquery GetAdminDetail($email: String!, $password: String!, $key: String!) {\n    getAdminDetail(email: $email, password: $password, key: $key)\n  }\n": types.GetAdminDetailDocument,
    "#graphql\n   query GetAllEmployees {\n       getAllEmployees {\n         LinkedinProfile\n         ProfileImageUrl\n         aadharNumber  \n         email\n         id\n         name\n       }\n    }\n": types.GetAllEmployeesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreateNewEmployee($employee: createEmployee!) {\n        createNewEmployee(employee: $employee) {\n          name\n          email\n          LinkedinProfile\n          aadharNumber\n          ProfileImageUrl\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation CreateNewEmployee($employee: createEmployee!) {\n        createNewEmployee(employee: $employee) {\n          name\n          email\n          LinkedinProfile\n          aadharNumber\n          ProfileImageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetAdminDetail($email: String!, $password: String!, $key: String!) {\n    getAdminDetail(email: $email, password: $password, key: $key)\n  }\n"): (typeof documents)["#graphql\nquery GetAdminDetail($email: String!, $password: String!, $key: String!) {\n    getAdminDetail(email: $email, password: $password, key: $key)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n   query GetAllEmployees {\n       getAllEmployees {\n         LinkedinProfile\n         ProfileImageUrl\n         aadharNumber  \n         email\n         id\n         name\n       }\n    }\n"): (typeof documents)["#graphql\n   query GetAllEmployees {\n       getAllEmployees {\n         LinkedinProfile\n         ProfileImageUrl\n         aadharNumber  \n         email\n         id\n         name\n       }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;