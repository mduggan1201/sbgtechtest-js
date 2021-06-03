import { Component } from "react";
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class OutcomeData extends Component {

    state = {
        loading:true,
        match: null,
        marketData: null,
        outcomeData: null,
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
    
    
        /*Outcome JSON Build */
        var featureOutcomes = [];
        fmJSON.map((fos) => (
          <div key={fos.marketId}>
            {featureOutcomes.push(fos.market.outcomes[0])}
          </div>
        ))
        const foJSON = []
        for (var x = 0; x< featureOutcomes.length; x++){
          var foURL = "http://localhost:8888/sportsbook/outcome/" + featureOutcomes[x]
          var foResponse = await fetch(foURL)
          var foData = await foResponse.json()
          foJSON.push(foData)
        }
        this.setState({match: data.events, marketData: fmJSON, outcomeData: foJSON, loading: false});
        console.log(foJSON)
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
            <TableCell>Featured Bet</TableCell>
            <TableCell align="right">Decimal Odds (Click to Change)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.outcomeData.map((row) => (
            <TableRow key={row.outcome.marketId}>
              <TableCell component="th" scope="row">
                {row.outcome.name}
              </TableCell>
              <TableCell align="right">{row.outcome.price.num + "/" + row.outcome.price.den}</TableCell>
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

export default OutcomeData;

