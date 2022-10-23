import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import store from './store'
import { Provider } from 'react-redux'
import LoginScreen from './screens/LoginScreen'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
