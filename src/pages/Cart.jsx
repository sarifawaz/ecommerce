import React from 'react'
import {Box, Typography, Container, Button, Grid } from '@mui/material'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, updateCartQuantity ,removeFromCart ,emptyAllCart }) => {

   
    const EmptyCart = () => {
      return (
      <Typography>You have no items in your shopping cart, 
        <Link to='/'> add some then come back again</Link></Typography>
    )}

    const FilledCart = () => {
      return (
      <>
        <Grid container justifyContent="center" spacing={3}>
          {cart.line_items?.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <CartItem
                    item={item}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart} />
              </Grid>
            )
          )}
        </Grid>
        <div>
          <Typography variant='body1' sx={{ textAlign: 'center', mt: '2rem', fontWeight: '600'}} >Subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
          <Box component='div' sx={{ textAlign: 'center' , m : '2rem'}}>
            <Button sx={{ mr: '1rem' }} size='large' color='error' variant='outlined' onClick={emptyAllCart}>Empty Cart</Button>
            <Button component={Link} to="/checkout" sx={{ mr: '1rem' }} size='large' color='success' variant='outlined'>Checkout</Button>

          </Box>
        </div>
      </>
      )}

    if(!cart.line_items)
      return 'Loading...'
  return (
    <Container>

      <Typography variant='h4' sx={{ textAlign: 'center' , mb: '2rem' }}>Your Shopping Cart</Typography>
      { !cart.line_items.length  ? <EmptyCart /> : <FilledCart />}
      
    </Container>
  )
}

export default Cart
