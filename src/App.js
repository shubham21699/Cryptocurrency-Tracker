import React from "react";
import './App.css'
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import CryptoConverter from "./components/CryptoConverter";
import News from "./components/News";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route exact path='/exchanges'>
                <Exchanges />
              </Route>
              <Route exact path='/cryptocurrencies'>
                <Cryptocurrencies />
              </Route>
              <Route exact path='/crypto/:coinId'>
                <CryptoDetails />
              </Route>
              <Route exact path='/news'>
                <News />
              </Route>
              <Route exact path='/cryptocurrencyconverter'>
                <CryptoConverter />
              </Route>
            </Switch>
          </div>
        </Layout>
         
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
            Cryptocurrency Tracker | All rights reserved
            <p style={{color: 'white', fontSize: '12px', fontStyle: 'italic'}}>( Get all the latest cryptocurrency data and details here only )</p>
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
       </div>
      </div>
    </div>
  );
}

export default App;
