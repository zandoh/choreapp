import styled from "@emotion/styled";

export const DashboardLayout = styled("div")`
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: 100px auto;
  padding: ${props => {
    console.log(props.theme);
    return "0";
  }};
`;

export const HeaderLayout = styled("div")`
  grid-column: 1 / 5;
`;

export const SidebarLayout = styled("div")`
  grid-column: 1 / 2;
  min-height: 100vh;
`;

export const BodyLayout = styled("div")`
  grid-column: 2 / 5;
  padding: 1rem;
`;
