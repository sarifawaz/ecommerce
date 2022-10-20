import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';


const Product = ({ product, onAddToCart }) => {

  return (
    <Card sx={{ maxWidth: '100%'}}>
        <CardMedia sx={{ height: '0', paddingTop: '60%' }} image={product.image.url} title={product.name} />
            <CardContent>
                <div style= {{display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <div>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} noWrap variant="h6" color="textSecondary" sx={{ fontSize: '1rem'}}></Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => onAddToCart(product.id, 1)} aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
    </Card>
  )
}

export default Product
