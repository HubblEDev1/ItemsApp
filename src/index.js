import React from 'react';
import ReactDOM from 'react-dom';
import { HeroeScreen } from './components/heroes/HeroeScreen';
import { LoginScreen } from './components/login/LoginScreen';
import { MarvelScreen } from './components/marvel/MarvelScreen';
import { HeroesApp } from './HeroesApp';
import { AppRouter } from './routers/AppRouter';

ReactDOM.render(
  <HeroesApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

