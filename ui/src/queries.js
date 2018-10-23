import { gql } from 'apollo-boost';

/* Posts Queries */
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
      description
    }
  }
`;

/* User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
