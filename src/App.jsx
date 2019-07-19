//根组件
import React, { Component } from "react";
import { Route, HashRouter, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;
import style from "./css/style.scss";
import Home from "./components/home/Home.jsx";
import Movie from "./components/movie/Movie.jsx";
import About from "./components/about/About.jsx";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HashRouter>
        <Layout className="layout" style={{ height: "100%" }}>
          <Header>
            <div className={style.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              //这里的默认选项 不能写死了 否则刷新后会出现路由和组件不对等的情况,
              //使用window.location.hash.split("/")[1]可以截取路由的地址数据，让他对应key值
              defaultSelectedKeys={[
                window.location.hash.split("/")[1] || "home"
              ]}
              style={{ lineHeight: "64px" }}
            >
              {/* 这里的key值需要被上面默认选项对应上，所以需要修改，这样就不会出问题了 */}
              <Menu.Item key="home">
                <Link to="/home">首页</Link>
              </Menu.Item>
              <Menu.Item key="movie">
                {/* 默认展示第一个且页数是第一页 */}
                <Link to="/movie/com_see/1">电影</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">关于</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              padding: "0 50px",
              // height: "100%",
              flex: 1,
              backgroundColor: "#fff"
            }}
          >
            <Route path="/home" component={Home} />
            <Route path="/movie" component={Movie} />
            <Route path="/about" component={About} />
          </Content>
          <Footer style={{ textAlign: "center" }}>React ©2019 Demo</Footer>
        </Layout>
      </HashRouter>
    );
  }
}
