import { Menu } from 'antd'
import './style.css'
import { NavLink } from 'react-router-dom'

const SiderMenu = props => {
  const handleMenuClick = () => {}

  return (
    <Menu
      className="menu"
      theme="dark"
      mode="vertical"
      onClick={handleMenuClick}
      defaultSelectedKeys={['0']}
      mode="inline"
    >
      <Menu.Item className="menu-item" key="0">
        <NavLink to="/add">
          <i className="iconfont">&#xe807;</i>
          <span>今日待办</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item className="menu-item" key="1">
        <i className="iconfont">&#xe608;</i>
        <span>最近代办</span>
      </Menu.Item>
      <Menu.Item className="menu-item" key="2">
        <NavLink to="/card">
          <i className="iconfont">&#xe703;</i>
          <span>卡片视图</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item className="menu-item" key="3">
        <i className="iconfont">&#xe703;</i>
        <span>分类清单</span>
      </Menu.Item>
      <Menu.Item className="menu-item" key="4">
        <i className="iconfont">&#xe601;</i>
        <span>搜索</span>
      </Menu.Item>
    </Menu>
  )
}

export default SiderMenu
