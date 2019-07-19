import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link, Route, Switch } from "react-router-dom";
import MovieList from "./movieList.jsx";
import MovieDetail from "./MovieDetail.jsx";
export default class Movie extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split("/")[2]]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="in_theaters">
              <Link to="/movie/in_theaters/1" />
              正在热映
            </Menu.Item>
            <Menu.Item key="coming_soon">
              <Link to="/movie/coming_soon/1">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="top250">
              <Link to="/movie/top250/1">Top250</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft: "2px" }}>
          <Content
            style={{
              background: "#fff",
              padding: 10,
              margin: 0,
              minHeight: 280
            }}
          >
            {/* 给路由设计参数  每次点击时传递类型和页码进行数据得更新 */}
            <Switch>
              {/* 使用路由中的switch，能够指定优先匹配前面的路由，如果匹配到前面的路由则后面的路由放弃匹配 */}
              <Route path="/movie/detail/:id" exact component={MovieDetail} />
              <Route path="/movie/:type/:page/" exact component={MovieList} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
