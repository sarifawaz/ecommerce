import React from 'react'
import { Button, Divider, Typography, Box } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeOut }) => {

  const handleSubmit = async (event , elements, stripe) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod ({ type: 'card', card: cardElement})

    if(error) {
      console.log(error)
    }else {
          const orderData = {
          line_items: checkoutToken.line_items,
          customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
          shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
          fulfillment: { shipping_method: shippingData.shippingOption },
          payment: {
            gateway: 'stripe',
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        };

      onCaptureCheckout(checkoutToken.id, orderData);
      timeOut()
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='body1' sx={{ margin:'1rem' }}>Payment methods</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          { ({ elements, stripe }) => (
            <form onClick={(e) => handleSubmit(e, elements, stripe) } style={{ margin:'0 1rem' }}>
              <CardElement/>
                <br />
                <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <Button variant='outlined' onClick={backStep} sx={{ margin: '1rem 0'}}>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} sx={{ margin: '1rem 0'}}>
                  Pay { checkoutToken.subtotal.formatted_with_symbol }
                </Button>
              </Box>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
