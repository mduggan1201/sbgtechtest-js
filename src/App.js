/* import logo from './logo.svg'; */
import './App.css';
import MatchData from './posts/MatchData'
import { Component } from 'react';
import MarketData from './posts/MarketData'
import OutcomeData from './posts/OutcomeData'
import OutcomeDataFraction from './posts/OutcomeDataFraction'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};
    this.handleClick = this.handleClick.bind(this);
    this.stateOdds = {isOddsToggleOn: false};
    this.handleClickOdds = this.handleClickOdds.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  handleClickOdds() {
    this.setState(prevState => ({
      isOddsToggleOn: !prevState.isOddsToggleOn
    }));
  }


  render () {
    return (
      <div className="App">
        <header className="App-header">
         <p>
            Sky Betting and Gaming Tech Test - JS
         </p>
        </header>
        <div className = "App-Body">
          <MatchData />

          <button onClick={this.handleClick}>
        {this.state.isToggleOn ? <MarketData /> : 'View Featured Markets'}
      </button>

      <button onClick={this.handleClickOdds}>
        {this.state.isToggleOn ?  this.state.isOddsToggleOn ? <OutcomeData /> : <OutcomeDataFraction /> : 'Open Markets to View Odds'}
      </button>
      
        </div>
    </div>
    )
  }
}


export default App;
