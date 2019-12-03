import React from "react";
import { NotFoundWrapper, StyledText } from "./styled";
import NotFoundImageSource from "../../assets/baby.png";
import { routes } from "../../util";
import { Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <NotFoundWrapper>
      <img src={NotFoundImageSource} alt="Baby yoda" />
      <StyledText>Oh no! Page not found.</StyledText>
      <Link to={routes.DASHBOARD}>
        <Button size="md">
          Dashboard
        </Button>
      </Link>
    </NotFoundWrapper>
  );
};

export default NotFound;
