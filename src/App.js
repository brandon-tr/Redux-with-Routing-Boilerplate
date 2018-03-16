import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { returnHi } from "./redux/actions/actions";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "./components/home";
import Page2 from "./components/page2";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ul className="links">
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/page2"> Page2 </Link>
            </li>
          </ul>
          <Route path="/" exact component={Home} />
          <Route path="/page2" component={Page2} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emptyReducer: state.hi
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      returnHi: returnHi
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));
