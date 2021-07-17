import { Avatar, Menu, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './style.css'

const UserInfo = props => {
  const { isLogged } = props
  const menu = (
    <Menu>
      <Menu.Item>个人中心</Menu.Item>
      <Menu.Item>用户注销</Menu.Item>
    </Menu>
  )

  return (
    <div className="user-info">
      {isLogged ? (
        <>
          <Dropdown className="user-dropdown" overlay={menu}>
            <Avatar
              className="avatar"
              alt="头像"
              shape="circle"
              icon={<UserOutlined />}
            ></Avatar>
          </Dropdown>
        </>
      ) : (
        <div style={{ color: 'white' }}>未登录</div>
      )}
    </div>
  )
}

export default UserInfo
