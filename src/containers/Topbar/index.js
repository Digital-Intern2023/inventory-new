import { Button, Layout } from "antd";
// import { Link } from "react-router-dom";

// import CustomScrollbars from "util/CustomScrollbars";
// import languageData from "./languageData";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
// import SearchBox from "../../components/SearchBox";
// import UserInfo from "../../components/UserInfo";
// import AppNotification from "../../components/AppNotification";
// import MailNotification from "../../components/MailNotification";
// import Auxiliary from "util/Auxiliary";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../Sidebar/UserProfile";
import { authUser } from "../../constanst";

const { Header } = Layout;

const Topbar = () => {
  const { navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  const width = useSelector(({ common }) => common.width);

  const dispatch = useDispatch();
  function removeLocalstorage() {
    localStorage.removeItem("user");
    window.location.reload("/");
  }
  // const languageMenu = () => (
  //   <CustomScrollbars className="gx-popover-lang-scroll">
  //     <ul className="gx-sub-popover">
  //       {languageData.map((language) => (
  //         <li
  //           className="gx-media gx-pointer"
  //           key={JSON.stringify(language)}
  //           onClick={() => dispatch(switchLanguage(language))}
  //         >
  //           <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
  //           <span className="gx-language-text">{language.name}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   </CustomScrollbars>
  // );

  // const updateSearchChatUser = (evt) => {
  //   setSearchText(evt.target.value);
  // };

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER ||
      ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
        width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn icon icon-menu"
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}

      {/* 
      <SearchBox
        styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
        placeholder="Search in app..."
        onChange={updateSearchChatUser}
        value={searchText}
      /> */}
      <ul className="gx-header-notifications gx-ml-auto">
        {width >= TAB_SIZE ? (
          <div style={{ display: "flex" }}>
            <UserProfile />
          </div>
        ) : (
          <Button
            onClick={() => {
              removeLocalstorage();
            }}
            className="gx-d-block gx-d-lg-none gx-pointer gx-mt-2"
          >
            ออกจากระบบ
          </Button>
        )}
      </ul>
    </Header>
  );
};

export default Topbar;
