import './App.css';
import { commerce } from './lib/commerce'
import Products from './components/Products/Products';
import NavBar from './components/Navbar/NavBar'
import { useEffect, useState } from 'react';
import Cart from './pages/Cart';
import Checkout from './pages/checkout/Checkout'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AirlineSeatLegroomReducedRounded } from '@mui/icons-material';

function App() {
  const [products, setProducts] = useState ([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  

  const fetchProducts = async () => {
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }

  const addToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item)
    console.log(item)
  }

  const updateCartQuantity = async (productId, quantity) => {
    const update = await commerce.cart.update(productId, { quantity })
    setCart(update)
  }

  const removeFromCart = async (productId) => {
    const removeItem = await commerce.cart.remove(productId)
    setCart(removeItem)
  }

  const emptyAllCart = async () => {
    const emptyCart = await commerce.cart.empty()
    setCart(emptyCart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log(cart)
  return (
    <BrowserRouter>
      <div className="App">

        <NavBar totalItems={cart.total_items} />
          <Routes>
            <Route path='/checkout' element={
            <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage} />} />
            <Route path='/' element={< Products products={products} onAddToCart={addToCart} />}>
            </Route>
            <Route path='/cart' element={<Cart
                    cart={cart}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    emptyAllCart={emptyAllCart}
              />}>
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
