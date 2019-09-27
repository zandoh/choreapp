// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";

jest.mock("./index.tsx");
jest.mock("./services/cognito.ts");

console.log("in setupTests all .................");
