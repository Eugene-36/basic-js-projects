import './App.css';
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListing from './components/ProductListining';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Header />
        <Switch>
          <Route path='/' exact component={ProductListing} />
          <Route path='/product/:productId' exact component={ProductDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
