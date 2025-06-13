import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripe!: Stripe;
  private elements!: StripeElements;
  public card!: StripeCardElement;
  private urlBackend: string = environment.urlApi;
  private http = inject(HttpClient);

  private stripeApiKey: string = environment.stripeApiKey;

  constructor() {
    this.inicializarStripe();
  }

  async inicializarStripe(): Promise<void> {
    const appearance:any ={
      theme: 'stripe',
      variables: {
        fontFamily: 'Arial, sans-serif',
        fontSizeBase: '16px',
        borderRadius: '4px',
        colorPrimary: '#32325d',
        colorBackground: '#f6f9fc',
      },
    }
    this.stripe = (await loadStripe(this.stripeApiKey))!;
    this.elements = this.stripe.elements({appearance});
    this.card = this.elements.create('card');
    this.card.mount('#formulariopago');
  }
  async crearMetodoPago(): Promise<string> {
    const { paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    return paymentMethod?.id ?? '';
  }

  async pagarCarrito() {
    const paymentMethodId = await this.crearMetodoPago();

    return this.http.post<any>(
      `${this.urlBackend}/api/carritos/pagar`,
      {
        paymentMethodId,
        isTest:true, // Cambia a false en producción
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
