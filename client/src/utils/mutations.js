import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_SAVED_ITINERARY = gql`
  mutation deleteSavedItinerary($itineraryId: ID!) {
    deleteSavedItinerary(itineraryId: $itineraryId) {
      id
      username
      email
      savedItineraries {
        itineraryId
        locations
      }
    }
  }
`;
