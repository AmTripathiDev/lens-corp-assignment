import { graphql } from "../../gql";

export const InsertNewEmployee= graphql(`#graphql
    mutation CreateNewEmployee($employee: createEmployee!) {
        createNewEmployee(employee: $employee) {
          name
          email
          LinkedinProfile
          aadharNumber
          ProfileImageUrl
        }
    }
`)
