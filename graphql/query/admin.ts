import { graphql } from "../../gql";

export const VerifyAdminDetail = graphql(`#graphql
query GetAdminDetail($email: String!, $password: String!, $key: String!) {
    getAdminDetail(email: $email, password: $password, key: $key)
  }
`
);