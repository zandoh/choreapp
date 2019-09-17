// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";
// import { CognitoService } from "./services/cognito";
jest.mock("./services/cognito"); // SoundPlayer is now a mock constructor

// beforeEach(() => {
//   CognitoService.mockClear();
// });
