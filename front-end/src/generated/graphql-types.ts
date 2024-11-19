import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Clothes = {
  __typename?: 'Clothes';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewClothe: Clothes;
  createNewTag: Tag;
  createNewcategory: Category;
  deleteCategoryById: Scalars['String']['output'];
  deleteClotheById: Scalars['String']['output'];
  deleteTagById: Scalars['String']['output'];
  modifyCategoryById: Category;
  modifyClotheById: Clothes;
  modifyTagById: Tag;
};


export type MutationCreateNewClotheArgs = {
  data: ClotheInput;
};


export type MutationCreateNewTagArgs = {
  NewTagName: Scalars['String']['input'];
};


export type MutationCreateNewcategoryArgs = {
  NewCatName: Scalars['String']['input'];
};


export type MutationDeleteCategoryByIdArgs = {
  idCateDelete: Scalars['Float']['input'];
};


export type MutationDeleteClotheByIdArgs = {
  idDelete: Scalars['Float']['input'];
};


export type MutationDeleteTagByIdArgs = {
  idTagDelete: Scalars['Float']['input'];
};


export type MutationModifyCategoryByIdArgs = {
  ModifyCatName?: InputMaybe<Scalars['String']['input']>;
  idCatToModify: Scalars['Float']['input'];
};


export type MutationModifyClotheByIdArgs = {
  data: UpdateAdInput;
};


export type MutationModifyTagByIdArgs = {
  ModifyTagName?: InputMaybe<Scalars['String']['input']>;
  idTagToModify: Scalars['Float']['input'];
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllClothes: Array<Clothes>;
  getAlltags: Array<Tag>;
  getCategoryById: Category;
  getClothesById: Clothes;
  getTagById: Tag;
};


export type QueryGetCategoryByIdArgs = {
  idCat: Scalars['Float']['input'];
};


export type QueryGetClothesByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  idTag: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Float']['input'];
};

export type UpdateAdInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ClotheInput = {
  category: Scalars['ID']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<PictureInput>>;
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<TagInput>>;
  title: Scalars['String']['input'];
};

export type AddNewClothingMutationVariables = Exact<{
  data: ClotheInput;
}>;


export type AddNewClothingMutation = { __typename?: 'Mutation', createNewClothe: { __typename?: 'Clothes', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type DeleteClotheByIdMutationVariables = Exact<{
  idDelete: Scalars['Float']['input'];
}>;


export type DeleteClotheByIdMutation = { __typename?: 'Mutation', deleteClotheById: string };

export type ModifyAdIdMutationVariables = Exact<{
  data: UpdateAdInput;
}>;


export type ModifyAdIdMutation = { __typename?: 'Mutation', modifyClotheById: { __typename?: 'Clothes', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetclothingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetclothingQuery = { __typename?: 'Query', getAllClothes: Array<{ __typename?: 'Clothes', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', name: string, id: number } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type GetClothingDetailsQueryVariables = Exact<{
  getClothesByIdId: Scalars['Float']['input'];
}>;


export type GetClothingDetailsQuery = { __typename?: 'Query', getClothesById: { __typename?: 'Clothes', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getAlltags: Array<{ __typename?: 'Tag', id: number, name: string }> };


export const AddNewClothingDocument = gql`
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
export type AddNewClothingMutationFn = Apollo.MutationFunction<AddNewClothingMutation, AddNewClothingMutationVariables>;

/**
 * __useAddNewClothingMutation__
 *
 * To run a mutation, you first call `useAddNewClothingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewClothingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewClothingMutation, { data, loading, error }] = useAddNewClothingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewClothingMutation(baseOptions?: Apollo.MutationHookOptions<AddNewClothingMutation, AddNewClothingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewClothingMutation, AddNewClothingMutationVariables>(AddNewClothingDocument, options);
      }
export type AddNewClothingMutationHookResult = ReturnType<typeof useAddNewClothingMutation>;
export type AddNewClothingMutationResult = Apollo.MutationResult<AddNewClothingMutation>;
export type AddNewClothingMutationOptions = Apollo.BaseMutationOptions<AddNewClothingMutation, AddNewClothingMutationVariables>;
export const DeleteClotheByIdDocument = gql`
    mutation DeleteClotheById($idDelete: Float!) {
  deleteClotheById(idDelete: $idDelete)
}
    `;
export type DeleteClotheByIdMutationFn = Apollo.MutationFunction<DeleteClotheByIdMutation, DeleteClotheByIdMutationVariables>;

/**
 * __useDeleteClotheByIdMutation__
 *
 * To run a mutation, you first call `useDeleteClotheByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClotheByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClotheByIdMutation, { data, loading, error }] = useDeleteClotheByIdMutation({
 *   variables: {
 *      idDelete: // value for 'idDelete'
 *   },
 * });
 */
export function useDeleteClotheByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClotheByIdMutation, DeleteClotheByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClotheByIdMutation, DeleteClotheByIdMutationVariables>(DeleteClotheByIdDocument, options);
      }
export type DeleteClotheByIdMutationHookResult = ReturnType<typeof useDeleteClotheByIdMutation>;
export type DeleteClotheByIdMutationResult = Apollo.MutationResult<DeleteClotheByIdMutation>;
export type DeleteClotheByIdMutationOptions = Apollo.BaseMutationOptions<DeleteClotheByIdMutation, DeleteClotheByIdMutationVariables>;
export const ModifyAdIdDocument = gql`
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
export type ModifyAdIdMutationFn = Apollo.MutationFunction<ModifyAdIdMutation, ModifyAdIdMutationVariables>;

/**
 * __useModifyAdIdMutation__
 *
 * To run a mutation, you first call `useModifyAdIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyAdIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyAdIdMutation, { data, loading, error }] = useModifyAdIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useModifyAdIdMutation(baseOptions?: Apollo.MutationHookOptions<ModifyAdIdMutation, ModifyAdIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyAdIdMutation, ModifyAdIdMutationVariables>(ModifyAdIdDocument, options);
      }
export type ModifyAdIdMutationHookResult = ReturnType<typeof useModifyAdIdMutation>;
export type ModifyAdIdMutationResult = Apollo.MutationResult<ModifyAdIdMutation>;
export type ModifyAdIdMutationOptions = Apollo.BaseMutationOptions<ModifyAdIdMutation, ModifyAdIdMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getAllCategories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetclothingDocument = gql`
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

/**
 * __useGetclothingQuery__
 *
 * To run a query within a React component, call `useGetclothingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetclothingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetclothingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetclothingQuery(baseOptions?: Apollo.QueryHookOptions<GetclothingQuery, GetclothingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetclothingQuery, GetclothingQueryVariables>(GetclothingDocument, options);
      }
export function useGetclothingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetclothingQuery, GetclothingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetclothingQuery, GetclothingQueryVariables>(GetclothingDocument, options);
        }
export function useGetclothingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetclothingQuery, GetclothingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetclothingQuery, GetclothingQueryVariables>(GetclothingDocument, options);
        }
export type GetclothingQueryHookResult = ReturnType<typeof useGetclothingQuery>;
export type GetclothingLazyQueryHookResult = ReturnType<typeof useGetclothingLazyQuery>;
export type GetclothingSuspenseQueryHookResult = ReturnType<typeof useGetclothingSuspenseQuery>;
export type GetclothingQueryResult = Apollo.QueryResult<GetclothingQuery, GetclothingQueryVariables>;
export const GetClothingDetailsDocument = gql`
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

/**
 * __useGetClothingDetailsQuery__
 *
 * To run a query within a React component, call `useGetClothingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClothingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClothingDetailsQuery({
 *   variables: {
 *      getClothesByIdId: // value for 'getClothesByIdId'
 *   },
 * });
 */
export function useGetClothingDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetClothingDetailsQuery, GetClothingDetailsQueryVariables> & ({ variables: GetClothingDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>(GetClothingDetailsDocument, options);
      }
export function useGetClothingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>(GetClothingDetailsDocument, options);
        }
export function useGetClothingDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>(GetClothingDetailsDocument, options);
        }
export type GetClothingDetailsQueryHookResult = ReturnType<typeof useGetClothingDetailsQuery>;
export type GetClothingDetailsLazyQueryHookResult = ReturnType<typeof useGetClothingDetailsLazyQuery>;
export type GetClothingDetailsSuspenseQueryHookResult = ReturnType<typeof useGetClothingDetailsSuspenseQuery>;
export type GetClothingDetailsQueryResult = Apollo.QueryResult<GetClothingDetailsQuery, GetClothingDetailsQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  getAlltags {
    id
    name
  }
}
    `;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export function useGetTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsSuspenseQueryHookResult = ReturnType<typeof useGetTagsSuspenseQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;