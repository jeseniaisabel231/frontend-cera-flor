import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
  StripePaymentElement,
  type StripeElementsOptionsClientSecret,
  type StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private urlBackend: string = environment.urlApi;
  private http = inject(HttpClient);
  private stripeApiKey: string = environment.stripeApiKey;
  private stripe!: Stripe;
  private elements!: StripeElements;

  public paymentElement!: StripePaymentElement;
  public card!: StripeCardElement;
  public clientSecret: string = '';
  private paymentIntentId: string = '';

  constructor() {
    this.inicializarStripe();
  }

  async inicializarStripe(): Promise<void> {
    this.stripe = (await loadStripe(this.stripeApiKey))!;
    const appearance: StripeElementsOptionsClientSecret['appearance'] = {
      theme: 'stripe',
      variables: {
        borderRadius: '8px',
        colorPrimary: '#6854d9',
      },
    };

    const options: StripePaymentElementOptions = {
      layout: {
        type: 'tabs',
        defaultCollapsed: false,
      },
      business: {
        name: 'Flor & Cera',
      },
      terms: {
        applePay: 'always',
        googlePay: 'always',
        paypal: 'always',
      },
    };

    this.obtenerIntentoPago().subscribe({
      next: ({
        paymentIntentClientSecret,
        paymentIntentId,
      }: any) => {
        this.clientSecret = paymentIntentClientSecret;
        this.paymentIntentId = paymentIntentId;

        this.elements = this.stripe.elements({
          clientSecret: paymentIntentClientSecret,
          appearance,
        });

        this.paymentElement = this.elements.create('payment', options);

        this.paymentElement.mount('#formulariopago');
      },
    });
  }

  public crearElementoTarjeta(): void {
    if (this.paymentElement && this.paymentElement.mount) {
      this.paymentElement.mount('#formulariopago');
    }
  }

  public obtenerIntentoPago() {
    return this.http.get(`${this.urlBackend}/api/carritos/iniciar-pago`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async pagarCarrito() {
    const { paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (paymentIntent?.status === 'succeeded') {
      return this.http.post<any>(
        `${this.urlBackend}/api/carritos/finalizar-pago`,
        { paymentIntentId: paymentIntent.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return Promise.reject('Error al procesar el pago');
  }
}
