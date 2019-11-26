import { mockUser } from "../../testUtil";
const generatedMock = jest.genMockFromModule('react-redux');

export const CognitoService = {
    ...generatedMock,
    getUserTokenFromLocalStorage: () => mockUser.jwt
}
