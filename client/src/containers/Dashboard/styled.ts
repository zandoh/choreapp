import styled from "@emotion/styled";

export const DashboardWrapper = styled("div")`
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: 100px auto;
`;

export const HeaderWrapper = styled("div")`
  grid-column: 1 / 5;
`;

export const SidebarWrapper = styled("div")`
  grid-column: 1 / 2;
  min-height: 100vh;
`;

export const BodyWrapper = styled("div")`
  grid-column: 2 / 5;
`;
