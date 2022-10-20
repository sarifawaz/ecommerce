import { useState, useEffect } from 'react'
import {CssBaseline, Box, Typography, Paper, Stepper, Step, StepLabel, CircularProgress, Button, Divider} from '@mui/material'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import {commerce} from '../../lib/commerce'
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] =useState(null)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate();

  useEffect( () => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type : 'cart'})

        setCheckoutToken(token)

      } catch {
        if (activeStep !== steps.length) navigate.push('/');
      }
    }

    generateToken()

  }, [cart])

  const nextStep = () => setActiveStep ( (prevActiveStep) => prevActiveStep + 1 )
  const backStep = () => setActiveStep ( (prevActiveStep) => prevActiveStep - 1 )


  const next = (data) => {
    setShippingData(data)

    nextStep()
  }

  const timeout = () => {
    setTimeout( () => {
      setIsFinished(true)
    }, 3000)
  }
  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5" sx={{ margin:'1rem'}} >Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/" sx={{ margin:'1rem'}}>Back to home</Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5" sx={{ margin:'1rem'}}>Thank you for your purchase!</Typography>
        <Divider />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/" sx={{ margin:'1rem'}}>Back to home</Button>
    </>
  ) :(
    <div>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5" sx={{ margin:'1rem'}}>Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/" sx={{ margin:'1rem'}}>Back to home</Button>
      </>
    );
  }

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
  : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeOut={timeout} />

  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ margin: '2rem 5rem' }} >
          <Typography sx={{ padding: '1rem 1rem 0rem 1rem' }} variant='h5' align='center'>Checkout</Typography>
          <Stepper sx={{ padding: '1rem' }} activeStep={activeStep}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </Box>
    </>
  )
}

export default Checkout
