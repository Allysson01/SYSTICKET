import React from "react";
import FadeIn from "react-fade-in";
import "../assets/css/custom.css";

export default class Grid extends React.Component {
  render() {
    return (
      <div>
        <FadeIn delay={100} transitionDuration={700}>{this.props.children}</FadeIn>
      </div>
    );
  }
}
