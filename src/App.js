import { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Card, Layout, Menu, BackTop } from 'antd'
import Todo from './components/Todo/index'

import './App.css'
import './assets/global.css'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

function App() {
  const [isLogged, setIsLogged] = useState(true)
  const [theme, setTheme] = useState('light')

  return (
    <Layout>
      <Router>
        {/* <Sider className="sider">
          <UserInfo isLogged={isLogged}></UserInfo>
          <SiderMenu></SiderMenu>
        </Sider> */}
        <Content className="content" style={{ minHeight: '100vh' }}>
          <Redirect fro="/" to="/todo"></Redirect>
          <Route path="/todo" component={Todo}></Route>
          {/* <Route path="/list" component={}></Route> */}
          {/* <Route path="/card" component={Card}></Route> */}
          {/* <Route path="" component={}></Route> */}
        </Content>
      </Router>
      <BackTop></BackTop>
    </Layout>
  )
}

export default App
