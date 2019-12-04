import styled from "@emotion/styled";
import { MenuButton, Avatar } from "@chakra-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

export const LogoWrapper = styled.div`
  width: 250px;
  height: auto;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledMenuButton = styled(MenuButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 32px;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 16px;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;
