import React, { useState } from 'react'
import { Box, Typography, Grid, Button, InputLabel, Select, MenuItem} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map( ([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map( ([code, name]) => ({id: code, label: name}))
    console.log(subdivisions)
    const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}))

    

    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

      setShippingCountries(countries)
      setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
  
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId , { country, region })

      setShippingOptions(options)
      setShippingOption(options[0].id)
    }

    useEffect(()=> {
      fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <div>
      <Typography variant='h5' sx={{ ml: '2rem', mt: '1rem' }} >Shipping Address</Typography>
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit( (data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }) )}>
            <Grid container spacing={3} sx={{ padding: '2rem' }}>
                <FormInput required name='firstName' label='First name' />
                <FormInput name='lastName' label='Last name' />
                <FormInput name='Address1' label='Address' />
                <FormInput name='email' label='Email' />
                <FormInput name='city' label='City' />
                <FormInput name='zip' label='ZIP / Postal Code' />
             <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} fullWidth>
                {countries.map( (country) => (
                  <MenuItem value={country.id} key={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
              <InputLabel>Region</InputLabel>
              <Select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} fullWidth>
                {subdivisions.map( (subdivision) => (
                  <MenuItem value={subdivision.id} key={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>

                ))}
              </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} onChange={(e) => setShippingOption(e.target.value)} fullWidth>
              {options.map( (opt) => (
                  <MenuItem value={opt.id} key={opt.id}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
            </Grid>
            <Box sx={{ mt: '1rem'}} />
            <Box component='div' sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button sx={{mr: '2rem', mb: '2rem'}} component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
              <Button sx={{mr: '2rem', mb: '2rem'}} variant='contained' color='primary' type='submit'>Next</Button>
            </Box>
            </form>
            
      </FormProvider>
    </div>
  )
}

export default AddressForm
