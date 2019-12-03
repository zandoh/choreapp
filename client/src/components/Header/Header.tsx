import React, { Fragment } from "react";
import { CognitoService } from "../../services/cognito";
import { HeaderWrapper } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/pro-light-svg-icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/core";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Header</h1>
      <Fragment>
        <FontAwesomeIcon icon={faBell} />
        <Menu>
          <MenuButton as={Button}>
            First Last
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => CognitoService.logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Fragment>
    </HeaderWrapper>
  );
};

export default Header;
