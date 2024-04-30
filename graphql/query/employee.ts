import { graphql } from "../../gql";

export const GetAllEmployee = graphql(`#graphql
   query GetAllEmployees {
       getAllEmployees {
         LinkedinProfile
         ProfileImageUrl
         aadharNumber  
         email
         id
         name
       }
    }
`);
