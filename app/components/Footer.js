import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore';
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount: function() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCards();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let leaderboardCards = this.state.cards.map((card) => {
      return (
        <li key={card.multiverseId}>
          <Link to={'/characters/' + card.multiverseId}>
            <img className='thumb-md' src={'htts://mtgimage.com/multiverseid/' + card.multiverseId +'.jpg'} />
          </Link>
        </li>
      )
    });

    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
              <p>You may view the <a href='https://github.com/rkho/magic-voting'>Source Code</a> behind this project on GitHub.</p>
            </div>
            <div className='col-sm-7 hidden-xs'>
              <h3 className='lead'><Strong>Leaderboard</strong> Top 5 Cards</h3>
              <ul className='list-inline'>
                {leaderboardCards}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
