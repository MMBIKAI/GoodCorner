import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
query GetCategories {
  getAllCategories {
    id
    name
  }
}
`;

export const GET_ALL_CLOTHES = gql`
  query Getclothing {
    getAllClothes {
      id
      title
      description
      owner
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        name
        id
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_DETAILS = gql`
  query GetClothingDetails($getClothesByIdId: Float!) {
    getClothesById(id: $getClothesByIdId) {
      id
      title
      description
      owner
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    getAlltags {
      id
      name
    }
  }
`;
