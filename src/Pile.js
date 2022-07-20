import React, { Component } from "react";
import "./Pile.css";
import { v4 as uuid } from "uuid";
import Card from "./Card";
import axios from "axios";
class Pilee extends Component {
  state = {
    cards: [],
    id: "",
    stacking: -1,
    void: 0,
    firstLoad: false,
  };
  setId = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((response) => {
        console.log("in");
        this.setState(() => ({
          id: response.data.deck_id,
          firstLoad: true,
        }));
      });
  };
  handleVoid = () => {
    this.setState({ void: 1 });
  };
  setId = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((response) => {
        console.log("in");
        this.setState(() => ({
          id: response.data.deck_id,
          firstLoad: true,
        }));
      });
  };
  addCard = () => {
    this.setState((st) => ({
      cards: [
        ...st.cards,
        <Card
          handleVoid={this.handleVoid}
          key={uuid()}
          id={st.id}
          stacking={st.stacking + 1}
        />,
      ],
      stacking: st.stacking + 1,
    }));
  };
  spin = () => {
    if (!this.state.firstLoad)
      return (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#545479",
          }}
        >
          <div class="spinner-box">
            <div class="circle-border">
              <div class="circle-core"></div>
            </div>
          </div>
          <h4 className="text-light">Loading App...</h4>
        </div>
      );
    else {
      return (
        <div className="page h-100 w-100  d-flex flex-column align-items-center">
          <button
            className="btn btn-success"
            onClick={() => {
              this.addCard();
            }}
            style={{ boxShadow: "none" }}
          >
            Draw Card
          </button>
          <div
            className="mt-5"
            style={{ position: "relative", width: "226px", height: "314px" }}
          >
            {this.state.cards.map((i) => i)}
          </div>
          <div>
            {this.state.void ? (
              <h3 className="mt-5" style={{ color: "#768a5d" }}>
                Out Of Cards!
              </h3>
            ) : null}
          </div>
        </div>
      );
    }
  };
  componentDidMount = () => {
    this.setId();
  };
  render() {
    return this.spin();
  }
}
export default Pilee;
