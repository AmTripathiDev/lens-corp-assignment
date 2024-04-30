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


export const getSignedURLForTweetQuery = graphql(`
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);