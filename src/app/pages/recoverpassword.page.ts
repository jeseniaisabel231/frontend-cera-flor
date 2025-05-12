import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-[#bebebe] flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <form 
          class="bg-[#3C3C3B] rounded-2xl shadow-md p-8"
          [formGroup]="recoverForm"
          (ngSubmit)="onSubmit()"
        >
          <h2 class="text-white text-lg font-medium mb-4">
            Correo electrónico
          </h2>
          
          <div class="mb-6 relative">
            <input
              type="email"
              placeholder="Ingresa tu correo"
              class="px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6854d9] border-[#878787] bg-white pl-12 border p-1.5 w-full h-[46px] rounded-[15px] outline-[#3C3C3B]"
              formControlName="email"
            />
            <div class="absolute left-3 top-3 text-gray-400 cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#3C3C3B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <rect width="18.5" height="15.5" x="2.75" y="4.25" rx="3" />
                  <path d="m2.75 8l8.415 3.866a2 2 0 0 0 1.67 0L21.25 8" />
                </g>
              </svg>
            </div>
          </div>

          @if (message()) {
            <div class="mb-4 p-3 rounded text-center" 
                 [class.bg-green-100]="isSuccess()"
                 [class.bg-red-100]="!isSuccess()"
                 [class.text-green-800]="isSuccess()"
                 [class.text-red-800]="!isSuccess()">
              {{ message() }}
            </div>
          }

          <button
            type="submit"
            class="relative inline-flex h-[46px] overflow-hidden rounded-[15px] p-[1px] w-full cursor-pointer items-center justify-center bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl hover:bg-morado-600 transition-colors duration-500"
            [disabled]="recoverForm.invalid || loading()"
          >
            @if (loading()) {
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            } @else {
              Recuperar Contraseña
            }
          </button>

          <div class="text-center text-sm text-gray-300 mt-6">
            ¿No tienes cuenta en Flor & Cera?
            <a routerLink="/registrarse" class="text-morado-500 hover:underline">Registrarse</a>
            <br />
            También puedes
            <a routerLink="/iniciar-sesion" class="text-morado-500 hover:underline">
              iniciar sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RecoverPasswordPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  message = signal('');
  isSuccess = signal(false);

  recoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async onSubmit() {
    if (this.recoverForm.invalid) return;

    this.loading.set(true);
    this.message.set('');
    
    try {
      const email = this.recoverForm.value.email!;
      
      // Llama al servicio para recuperar contraseña
      const response = await this.authService.recuperarPassword(email).toPromise();
      
      this.isSuccess.set(true);
      this.message.set('Se ha enviado un correo con las instrucciones para restablecer tu contraseña');
      
      // Opcional: Redirigir después de cierto tiempo
      setTimeout(() => {
        this.router.navigate(['/iniciar-sesion']);
      }, 3000);
       
    } catch (error: any) {
      this.isSuccess.set(false);
      this.message.set(error.error?.msg || 'Ocurrió un error al intentar recuperar la contraseña');
    } finally {
      this.loading.set(false);
    }
  }
}