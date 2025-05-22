import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalAvisosComponent } from "../components/admin/modalavisos.component";

@Component({
  imports: [RouterLink, ReactiveFormsModule, ModalAvisosComponent],
  template: `
    <div
      class="min-h-screen bg-[#bebebe] flex items-center justify-center px-4"
    >
      <div class="w-full max-w-md">
        <form
          class="bg-[#3C3C3B] rounded-2xl shadow-md p-8"
          [formGroup]="formulario"
          (ngSubmit)="onSubmit()"
        >
          <h2 class="text-white text-2xl mb-4 text-center font-medium text-[25px] ">
            Recuperar contraseña
          </h2>
          <span class="font-medium text-white">Correo electrónico <span class="text-red-400"> *</span></span>
          
          <div class="mb-6 mt-1 relative">
            @let emailInvalido = formulario.get('email')?.invalid && formulario.get('email')?.value;

            <input
              type="email"
              placeholder="Ingresa tu correo"
              class="px-4 py-3 placeholder-gray-400  bg-white pl-12 border p-1.5 w-full h-[46px] rounded-[15px] "
              formControlName="email"
              (input)="borrarError()"
              [class]="emailInvalido ? 'border-red-400 outline-red-400 text-red-400' : 'border-[#878787] outline-[#3C3C3B] text-[#3C3C3B]'"
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
                  [class]="emailInvalido ? 'stroke-red-400' : 'stroke-[#3C3C3B]'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <rect width="18.5" height="15.5" x="2.75" y="4.25" rx="3" />
                  <path d="m2.75 8l8.415 3.866a2 2 0 0 0 1.67 0L21.25 8" />
                </g>
              </svg>
            </div>
            @if(error()) {
            <small class="text-red-400"> {{error()}}</small>
            }@else if(emailInvalido){
            <small class="text-red-400">Por favor, ingresa un correo electrónico válido.</small>
            }
          </div>


          <button
            type="submit"
            class="relative inline-flex h-[46px] overflow-hidden rounded-[15px] p-[1px] w-full cursor-pointer items-center justify-center bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl hover:bg-morado-600 transition-colors duration-500"
          >
            @if (loading()) {
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            } @else { Recuperar Contraseña }
          </button>

          <div class="text-center text-sm text-gray-300 mt-6">
            ¿No tienes cuenta en Flor & Cera?
            <a
              routerLink="/registrarse"
              class="text-morado-500 hover:underline"
            >
              Registrarse
            </a>
            <br />
            También puedes
            <a
              routerLink="/iniciar-sesion"
              class="text-morado-500 hover:underline"
            >
              iniciar sesión
            </a>
          </div>
        </form>
      </div>
    </div>
    <app-modal [(mostrarModal)]="mostrarModal" [titulo]="titulo()" [mensaje]="mensaje() " [tipo]="tipoRespuesta()">
      
    </app-modal>
  `,
})
export class RecuperarContrasenia {
  public authService = inject(AuthService);
  public mostrarModal = signal<boolean>(false);
  public titulo = signal('');
  public mensaje = signal('');

  //variable para el formulario de recuperar contrasena cuando este sea exitoso
  public tipoRespuesta = signal<'exito' | 'error'>('exito');

  public router = inject(Router);
  
  public loading = signal(false);

  public formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public error = signal('');

  onSubmit() {
    if (this.formulario.valid) {
      this.loading.set(true);
      this.authService
        .recuperarContrasenia(this.formulario.value.email!)
        .subscribe({
          next: (res) => {
            //momentaneamente
            //this.error.set(res.msg);
            this.titulo.set('Éxito');
            this.mensaje.set(res.msg);
        
            this.tipoRespuesta.set('exito');
            this.mostrarModal.set(true);

          },
          error: (err) => {
            //this.error.set(err.error.msg);
            this.titulo.set('Error');
            this.mensaje.set(err.error.msg);
            this.tipoRespuesta.set('error');
            this.mostrarModal.set(true);
          },
        })
        .add(() => {
          this.loading.set(false);
          this.formulario.reset();
        });
    } else {
      this.error.set('Por favor, ingresa un correo electrónico válido.');
    }
  }
  //metodo para borrar errores del cuando se escribe un nuevo valor
  borrarError() {
    this.error.set('');
  }
}
