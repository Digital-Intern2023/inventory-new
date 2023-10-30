import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import "../../styles/App.css";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";

import { useSelector } from "react-redux";
import SubMenu from "antd/lib/menu/SubMenu";
import { authUser } from "../../constanst";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          {/* <UserProfile /> */}
          {/* <AppsNavigation /> */}
          <b>เมนู</b>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <Menu.Item key="sample">
              <NavLink exact to="/" activeStyle={{ color: "orange" }}>
                <i className={"icon icon-dasbhoard"} />
                ภาพรวมระบบ
              </NavLink>
            </Menu.Item>

            <Menu.Item key="material">
              <NavLink to="/material" activeStyle={{ color: "orange" }}>
                <i className="icon icon-widgets" />
                จัดการข้อมูลอะไหล่กลาง
              </NavLink>
            </Menu.Item>

            <Menu.Item key="Now">
              <NavLink to="/Now">
                <i className="icon icon-widgets" />
                อะไหล่ ณ ปัจจุบัน
              </NavLink>
            </Menu.Item>
            <Menu.Item key="Stock">
              <NavLink to="/stock" activeStyle={{ color: "orange" }}>
                <i className="icon icon-widgets" />
                รับอะไหล่เข้าศูนย์
              </NavLink>
            </Menu.Item>
            <Menu.Item key="use">
              <NavLink to="/order" activeStyle={{ color: "orange" }}>
                <i className="icon icon-widgets" />
                เบิกอะไหล่ออกจากศูนย์
              </NavLink>
            </Menu.Item>

            <SubMenu
              key="catalog"
              popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={
                <span>
                  <i className="icon icon-widgets" />
                  <span>Catalog</span>
                </span>
              }
            >
              <Menu.Item key="Overview">
                <NavLink to="/Overview" activeStyle={{ color: "orange" }}>
                  <i className="icon icon-crypto" />
                  ภาพรวมเครื่องจักร
                </NavLink>
              </Menu.Item>

              <Menu.Item key="catalog">
                <NavLink to="/catalog" activeStyle={{ color: "orange" }}>
                  <i className="icon icon-widgets" />
                  รายการเครื่องจักร
                </NavLink>
              </Menu.Item>
            </SubMenu>


            <Menu.Item key="log">
              <NavLink to="/log" activeStyle={{ color: "orange" }}>
                <i className="icon icon-widgets" />
                ประวัติการทำรายการ
              </NavLink>
            </Menu.Item>

            {authUser.user.id == 3 ? (
              <>
                <Menu.Item key="usermanage">
                  <NavLink to="/usermanage" activeStyle={{ color: "orange" }}>
                    <i className="icon icon-widgets" />
                    จัดการข้อมูลผู้ใช้งาน
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="store">
                  <NavLink to="/store" activeStyle={{ color: "orange" }}>
                    <i className="icon icon-widgets" />
                    Store
                  </NavLink>
                </Menu.Item>
              </>
            ) : null}

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
