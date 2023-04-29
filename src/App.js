import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import Home from './Page/Home'
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductDetail from './Page/ProductDetail';
import Cart from './Page/Cart';

function App() {
  return (
    <>
      <Header/>
      <div className='main-container-body'>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
        <Redirect to="/" />
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
