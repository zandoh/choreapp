import { GraphQLResolveInfo } from 'graphql';

export type Maybe<T> = T | null;
export type ReferenceResolver<TResult, TReference, TContext> = (
	reference: TReference,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;
export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	_FieldSet: any;
};

export type User = {
	__typename?: 'User';
	userID: Scalars['ID'];
	username?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	organization?: Maybe<Scalars['String']>;
};

export type ResolversParentTypes = ResolversObject<{
	Query: {};
	User: User;
	ID: Scalars['ID'];
	String: Scalars['String'];
	Boolean: Scalars['Boolean'];
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
	Query: ResolverTypeWrapper<{}>;
	User: ResolverTypeWrapper<User>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
	Query?: QueryResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
}>;

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
	me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
	__resolveReference?: ReferenceResolver<
		Maybe<ResolversTypes['User']>,
		{ __typename: 'User' } & Pick<ParentType, 'userID'>,
		ContextType
	>;

	name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
}>;
