import { GraphQLResolveInfo } from 'graphql';
import { AppUserContext } from './lib/choreapp-util/common';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type Query = {
   __typename?: 'Query',
  getRandomList?: Maybe<Random>,
  getRandomNumberById?: Maybe<Array<Maybe<RandomDynamoData>>>,
};


export type QueryGetRandomListArgs = {
  length?: Maybe<Scalars['Int']>
};


export type QueryGetRandomNumberByIdArgs = {
  numberId?: Maybe<Scalars['String']>
};

export type Random = {
   __typename?: 'Random',
  list?: Maybe<Array<Maybe<Scalars['Int']>>>,
  length?: Maybe<Scalars['Int']>,
  sum?: Maybe<Scalars['Int']>,
};

export type RandomDynamoData = {
   __typename?: 'RandomDynamoData',
  randomNumberId?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Random: ResolverTypeWrapper<Random>,
  String: ResolverTypeWrapper<Scalars['String']>,
  RandomDynamoData: ResolverTypeWrapper<RandomDynamoData>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Int: Scalars['Int'],
  Random: Random,
  String: Scalars['String'],
  RandomDynamoData: RandomDynamoData,
  Boolean: Scalars['Boolean'],
}>;

export type QueryResolvers<ContextType = AppUserContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getRandomList?: Resolver<Maybe<ResolversTypes['Random']>, ParentType, ContextType, QueryGetRandomListArgs>,
  getRandomNumberById?: Resolver<Maybe<Array<Maybe<ResolversTypes['RandomDynamoData']>>>, ParentType, ContextType, QueryGetRandomNumberByIdArgs>,
}>;

export type RandomResolvers<ContextType = AppUserContext, ParentType extends ResolversParentTypes['Random'] = ResolversParentTypes['Random']> = ResolversObject<{
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>,
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  sum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type RandomDynamoDataResolvers<ContextType = AppUserContext, ParentType extends ResolversParentTypes['RandomDynamoData'] = ResolversParentTypes['RandomDynamoData']> = ResolversObject<{
  randomNumberId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = AppUserContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  Random?: RandomResolvers<ContextType>,
  RandomDynamoData?: RandomDynamoDataResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = AppUserContext> = Resolvers<ContextType>;
