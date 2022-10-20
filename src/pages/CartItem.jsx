import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';

const CartItem = ({ item, updateCartQuantity ,removeFromCart }) => {
  return (
    <Card sx={{ maxWidth: '100%'}}>
        <CardMedia sx={{ height: 180 }} image={item.image.url} title={item.name} />
            <CardContent>
                <Box component='div' style= {{display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body1">
                        {item.price.formatted_with_symbol}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <Box component='div' sx= {{ display: 'flex' , alignItems: 'center' }}>
                <Button type='button' size='small' onClick={() => updateCartQuantity (item.id, item.quantity -1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small' onClick={() => updateCartQuantity (item.id, item.quantity +1)}>+</Button>
                </Box>
                <Button size='small' variant='contained' type='button' color='error' onClick={() => removeFromCart(item.id)}>Remove</Button>
            </CardActions>
    </Card>
  )
}

export default CartItem
