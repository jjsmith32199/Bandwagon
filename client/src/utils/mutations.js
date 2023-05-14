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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
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
