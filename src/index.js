import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { LitLounge} from './components/LitLounge.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LitLounge />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
