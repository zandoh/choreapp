import gql from "graphql-tag";

export const RandomNumberById = gql`
	query {
		getRandomNumberById(numberId: $id) {
			__typename
			randomNumberId
			username
		}
	}
`;
