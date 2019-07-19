import React, { Component } from "react";
//导入UI组件
import { Spin, Alert, Pagination } from "antd";
import fetchJSONP from "fetch-jsonp";

import MovieItem from "./MovieItem.jsx";
export default class movieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true, //数据是否在加载中，如果为true表示在加载，false则为加载完成
      movies: [], //电影列表
      pageSize: 12, //每页显示的电影个数
      nowPage: parseInt(props.match.params.page) || 1, //展示第几页
      total: 0, //当前的电影分类下，总共有多少条数据
      movieType: props.match.params.type // 保存需要获取电影的类型
    };
  }
  componentWillMount() {
    this.loadMovieListByTypeAndPage();
  }
  loadMovieListByTypeAndPage = () => {
    //由于接口失效的原因，只能使用假数据，做学习使用
    // const start = this.state.pageSize * (this.state.nowPage - 1);
    // const url = `https://api/douban.com/v2/movie/${
    //   this.state.movieType
    // }?start=${start}&count=${this.state.pageSize}`;
    // fetchJSONP(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       movies: data.subjects,
    //       total: data.total,
    //       isLoding: false
    //     });
    //   });
    setTimeout(() => {
      //获取电影的类型打开对应的文件
      const data = require(`../../test_data/${this.state.movieType}.json`);
      this.setState({
        movies: data.subjects,
        total: data.total,
        isLoding: false
      });
    }, 1000);
  };
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        isLoding: true,
        nowPage: parseInt(nextProps.match.params.page) || 1,
        movieType: nextProps.match.params.type
      },
      function() {
        this.loadMovieListByTypeAndPage();
      }
    );
  }
  pageChanged = page => {
    //我们可以通过BOM操作进行url地址的跳转，但是这个不是我们想要的，我们尽量使用路由进行编程式导航
    // window.location.href = `#/movie/${this.props.match.params.type}/${page}`;
    //使用react-router-dom实现编程式导航
    this.props.history.push(`/movie/${this.props.match.params.type}/${page}`);
  };
  render() {
    return <div>{this.renderList()}</div>;
  }
  renderList = () => {
    if (this.state.isLoding) {
      return (
        <Spin tip="请稍后...">
          <Alert
            message="正在全力加载中..."
            description="精彩内容马上呈现..."
            type="info"
          />
        </Spin>
      );
    } else {
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              backgroundColor: "white"
            }}
          >
            {this.state.movies.map(item => {
              return (
                <MovieItem
                  {...item}
                  key={item.id}
                  history={this.props.history}
                />
              );
            })}
          </div>
          <Pagination
            defaultCurrent={this.state.nowPage}
            total={this.state.total}
            pageSize={this.state.pageSize}
            onChange={this.pageChanged}
          />
        </div>
      );
    }
  };
}
