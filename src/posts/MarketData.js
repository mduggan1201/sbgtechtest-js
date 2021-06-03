import { Component } from "react";
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class MarketData extends Component {

  state = {
    loading:true,
    match: null,
    marketData: null,
  };

  async componentDidMount() {
    const url = "http://localhost:8888/football/live?primaryMarkets=true";
    const response = await fetch(url);
    const data = await response.json();
    var featureMarkets = [];
      data.events.map((fms) => (
        <div key={fms.eventId}>
          {featureMarkets.push(fms.markets)}
        </div>
      ))
    /*Fetch Relevant URLS */
    const fmJSON = []
    for (var i = 0; i < featureMarkets.length; i++) {
      var fmURL = "http://localhost:8888/sportsbook/market/" + featureMarkets[i]
      var fmResponse = await fetch(fmURL)
      var fmData = await fmResponse.json()
      fmJSON.push(fmData)
    }
    this.setState({match: data.events, marketData: fmJSON, loading: false});

  };




  render() {
    return (
      <div>
        {this.state.loading ? (
          <div> loading...</div>
        ) : ( 
<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Featured Market</TableCell>
            <TableCell align="right">Cashout Available</TableCell>
            <TableCell align="right">Currently Suspended</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.marketData.map((row) => (
            <TableRow key={row.market.eventId}>
              <TableCell component="th" scope="row">
                {row.market.name}
              </TableCell>
              <TableCell align="right">{row.market.status.cashoutable ? (<div>Yes</div>) : ( <div>No</div>)}</TableCell>
              <TableCell align="right">{row.market.status.suspended ? (<div>Yes</div>) : ( <div>No</div>)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
</TableContainer> 

        )}

      </div>
    )
  }
}

export default MarketData;

