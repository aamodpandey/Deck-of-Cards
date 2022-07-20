import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Card = styled.span`
  position: absolute;
  left: 0;
`;
class Carde extends Component {
  state = {
    imgSrc: "",
  };

  componentDidMount = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.props.id}/draw/`)
      .then((res) => {
        let ref = res.data["cards"];
        if (res.data.remaining <= 0) this.props.handleVoid();
        else {
          this.setState({
            imgSrc: ref[0]["image"],
          });
        }
      });
  };
  rf = () => Math.floor(Math.random(10) * 10) + 1;

  render() {
    return (
      <Card style={{ zIndex: this.props.stacking }}>
        <img
          src={this.state.imgSrc}
          style={{
            transform: `rotateZ(${360 / this.rf()}deg)`,
          }}
        ></img>
      </Card>
    );
  }
}
export default Carde;
