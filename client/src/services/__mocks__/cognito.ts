import { mockUser } from "../../testUtil";

export const CognitoService = {
  getUserTokenFromLocalStorage: () => mockUser.jwt
};
