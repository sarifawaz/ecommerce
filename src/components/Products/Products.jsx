import Product from './Product'
import { Grid } from '@mui/material';

const Products = ({ products, onAddToCart }) => {
  return (
    <main style={{ margin: '1rem' }}>
      <Grid container justifyContent="center" spacing={4}>
        {
          products.map((product) => {
            return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
            )})
        }
            </Grid>
    </main>
  )
}

export default Products
