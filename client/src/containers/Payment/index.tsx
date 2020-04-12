/**
 * Payment
 */

import React from 'react';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { Button, Input } from 'antd';
import { useQuery, useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { PaymentProps } from './interfaces';
import { GET_PAYMENT, CREATE_PAYMENT } from './gql';
import styled from 'styled-components';
import Spacing from 'components/Spacing';
import { FieldNames } from './enums';
import { validationSchema } from './validations';

const StripeCard = styled(CardElement)`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 4px 11px;
  margin-bottom: 1rem;
`;

// id: "pm_1GWl99EmSOiC5gweRm1mecA0"
// object: "payment_method"
// billing_details:
// address: {city: null, country: null, line1: null, line2: null, postal_code: "42424", …}
// email: null
// name: null
// phone: null
// __proto__: Object
// card:
// brand: "visa"
// checks: {address_line1_check: null, address_postal_code_check: null, cvc_check: null}
// country: "US"
// exp_month: 4
// exp_year: 2024
// funding: "credit"
// generated_from: null
// last4: "4242"
// three_d_secure_usage: {supported: true}
// wallet: null
// __proto__: Object
// created: 1586618487
// customer: null
// livemode: false
// metadata:
// __proto__: Object
// type: "card"

const Payment: React.FC<PaymentProps> = () => {
  const Form = () => {
    const [paymentRequest, setPaymentRequest] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { control, handleSubmit, errors } = useForm({
      validationSchema,
    });
    const stripe = useStripe();
    const elements = useElements();

    React.useEffect(() => {
      if (stripe) {
        const paymentRequest = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {
            label: 'Demo total',
            amount: 1099,
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        // Check the availability of the Payment Request API first.
        paymentRequest.canMakePayment().then(result => {
          console.log('[result]', result);

          if (result) {
            setPaymentRequest(paymentRequest);
          }
        });
      }
    }, [stripe]);

    const onFormSubmit = async (values: any) => {
      console.log(values);

      setIsLoading(true);
      if (!stripe || !elements) {
        return;
      }
      const card: any = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {},
      });

      if (error) {
        setIsLoading(false);
        console.log('[error]', error);
      } else {
        setIsLoading(false);
        console.log('[PaymentMethod]', paymentMethod);
      }
    };

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Spacing margin="0 0 1rem 0">
          <Button
            block
            htmlType="submit"
            type="primary"
            loading={isLoading}
            disabled={!stripe || !elements}
          >
            Place order now
          </Button>
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller name={FieldNames.EMAIL} control={control} placeholder="Email" as={Input} />
          <ErrorMessage errors={errors} name={FieldNames.EMAIL} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.FULL_NAME}
            control={control}
            placeholder="Full Name"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.FULL_NAME} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            type="number"
            name={FieldNames.PHONE_NUMBER}
            control={control}
            placeholder="Phone Number"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.PHONE_NUMBER} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.ADDRESS_CITY}
            control={control}
            placeholder="City"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.ADDRESS_CITY} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.ADDRESS_COUNTRY}
            control={control}
            placeholder="Country"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.ADDRESS_COUNTRY} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.ADDRESS_LINE1}
            control={control}
            placeholder="Line 1"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.ADDRESS_LINE1} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.ADDRESS_LINE2}
            control={control}
            placeholder="Line 2"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.ADDRESS_POSTAL_CODE} />
        </Spacing>
        <Spacing margin="0 0 8px 0">
          <Controller
            name={FieldNames.ADDRESS_POSTAL_CODE}
            control={control}
            placeholder="Postal"
            as={Input}
          />
          <ErrorMessage errors={errors} name={FieldNames.ADDRESS_LINE2} />
        </Spacing>
        <StripeCard />
        <Button
          block
          htmlType="submit"
          type="primary"
          loading={isLoading}
          disabled={!stripe || !elements}
        >
          Place order now
        </Button>
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }}>
            TEST
          </PaymentRequestButtonElement>
        )}
      </form>
    );
  };

  return (
    <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY!)}>
      <Form />
    </Elements>
  );
};

export default Payment;
