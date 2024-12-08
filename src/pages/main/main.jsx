import React from "react";
import { Route } from "react-router-dom";
import "./main.css";

const Home = () => {
  return (
    <div class="container">
      <div class="left-div">
        <img id="img-logo" src="../src/img/apyshelf-logo.png"/>
        <h1 id="h1-logo">APYSHELF</h1>
        <p id="p-info-left">Your next read is just a tap away!</p>
      </div>
      <div class="right-div">
        <h1 id="h1-title">Welcome to APYSHELF</h1>
        <p id="p-info-right">Our app is designed to make managing <br /> book loans easy and hassle-free.</p>
        <div class="div-buttons">
        <a href="/signin"><button id="btn-signin">Sign in</button></a>
        <a href="/signon"><button id="btn-createaccount">Create account</button></a>
        </div>
      </div>
    </div>

  );
};

export default Home;
