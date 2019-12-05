import React from "react";
import { SidebarWrapper, StyledFontAwesomeIcon, StyledNavLink } from "./styled";
import {
	faColumns,
	faAnalytics,
	faUsers,
	faThList
} from "@fortawesome/pro-light-svg-icons";
import { routes } from "../../util";

const Sidebar: React.FC = () => {
	return (
		<SidebarWrapper>
			<StyledNavLink to={routes.DASHBOARD} activeClassName="selected">
				<StyledFontAwesomeIcon size="2x" icon={faColumns} />
			</StyledNavLink>
			<StyledNavLink to={routes.REPORTS} activeClassName="selected">
				<StyledFontAwesomeIcon size="2x" icon={faAnalytics} />
			</StyledNavLink>
			<StyledFontAwesomeIcon size="2x" icon={faThList} />
			<StyledFontAwesomeIcon size="2x" icon={faUsers} />
		</SidebarWrapper>
	);
};

export default Sidebar;
