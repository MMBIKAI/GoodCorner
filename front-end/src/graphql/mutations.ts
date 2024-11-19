import { gql } from "@apollo/client";


export const ADD_NEW_CLOTHING = gql`
  mutation AddNewClothing($data: clotheInput!) {
    createNewClothe(data: $data) {
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

export const DELETE_CLOTHE_BY_ID = gql`
mutation DeleteClotheById($idDelete: Float!) {
  deleteClotheById(idDelete: $idDelete)
}
`;

export const MODIFY_AD_ID = gql`
mutation ModifyAdId($data: UpdateAdInput!) {
  modifyClotheById(data: $data) {
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