
import './App.css';
import Users from './components/Users';
import Products from './components/Products';
import MapView from './components/MapView';
import Cluster from './components/Cluster'
import Chart from './components/Chart'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="app">
            <Routes>
                <Route exact path="/" element={< Users />} />
                <Route exact path="/products" element={< Products />} />
                <Route exact path="/mapview" element={< MapView />} />
                <Route exact path="/cluster" element={< Cluster />} />
                <Route exact path="/chart" element={< Chart />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
