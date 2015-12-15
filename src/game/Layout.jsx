import React from 'react';
import reducer from './redux/index';
import NextTickButtonComponent from './components/NextTickButton';
import Hero from './components/Hero';
import { addHero } from './actions';
import { connect } from 'react-redux';

const NextTickButton = connect((state) => state.tick)(NextTickButtonComponent);

export default React.createClass({
  render () {
    return (
      <div className="game">
        {this.props.heroes.map((hero, idx) => {
          let h = hero.toJSON();
          return (<Hero key={idx} id={idx} dispatch={this.props.dispatch} attack={h.attack} hitpoints={h.hitpoints}/>);
        })}
        <div onClick={() => this.props.dispatch(addHero(10, 100))}>Click to add hero</div>
        <NextTickButton />
      </div>
    );
  }
});
