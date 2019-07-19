import React, { Component } from "react";
import { Button, Icon } from "antd";
export default class MovieDetail extends Component {
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.goBack}>
          <Icon type="left" />
          返回电影列表
        </Button>
        <div style={{ textAlign: "center" }}>
          <h1>恶人传 악인전 (2019)</h1>
          <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555084871.webp" />
          <p>
            罪犯头目张东洙（Don
            Lee）被一名神秘莫测的连环杀手暴力袭击之后幸存，与当地警探郑泰硕（Kim
            Moo Yul）形成了一种奇妙的搭档关系，联手捕捉被称为“K”的虐待狂杀手”。
          </p>
        </div>
      </div>
    );
  }
  goBack = () => {
    this.props.history.go(-1);
  };
}
