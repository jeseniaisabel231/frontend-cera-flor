import { Component } from '@angular/core';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [Headers, BarranavComponent],
  template: `
    <headers
      data-testid="header"
    ></headers>
    <main class="flex min-h-screen flex-col">
      <barranav rutaSeccionSeleccionada="sobre nosotros"></barranav>
      <section class="bg-white px-6 py-12 text-center">
        <div class="mx-auto max-w-4xl">
          <img
            src="/SBprincipal.jpg"
            alt="Nuestra historia"
            class="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
          />
          <h2 class="mb-4 text-3xl font-semibold font-playfair ">
            Nuestra historia
          </h2>
          <p>
            En Flor & Cera, creemos en el poder de lo natural y lo artesanal.
            Nuestra pasión por el bienestar y el cuidado de la piel nos llevó a
            crear jabones y velas hechos a mano, utilizando ingredientes puros,
            libres de químicos agresivos y respetuosos con el medio ambiente.
          </p>
        </div>
      </section>

      <!-- Nuestra Filosofía -->
      <section class="bg-yellow-50 px-6 py-12 text-center">
        <h2 class="mb-10 text-2xl font-semibold font-playfair">
          Nuestra Filosofía
        </h2>
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
          <div class="rounded-lg bg-green-100 p-6">
            <div class="mb-2 text-2xl">🌿</div>
            <h3 class="mb-2 font-bold">Ingredientes Naturales</h3>
            <p>
              Utilizamos aceites esenciales, mantecas vegetales y extractos
              botánicos
            </p>
          </div>
          <div class="rounded-lg bg-blue-100 p-6">
            <div class="mb-2 text-2xl">✋</div>
            <h3 class="mb-2 font-bold">Hecho a Mano</h3>
            <p>
              Cada jabón y vela es elaborado artesanalmente, asegurando calidad
              y originalidad en cada pieza.
            </p>
          </div>
          <div class="rounded-lg bg-purple-100 p-6">
            <div class="mb-2 text-2xl">🌍</div>
            <h3 class="mb-2 font-bold">Sostenibilidad</h3>
            <p>
              Nos comprometemos con el medio ambiente utilizando empaques
              ecológicos y procesos responsables.
            </p>
          </div>
          <div class="rounded-lg bg-orange-100 p-6">
            <div class="mb-2 text-2xl">🛁</div>
            <h3 class="mb-2 font-bold">Bienestar y Relajación</h3>
            <p>
              Nos comprometemos con el medio ambiente utilizando empaques
              ecológicos y procesos responsables.
            </p>
          </div>
        </div>
      </section>

      <!-- Misión -->
      <section class="bg-blue-50 px-6 py-12">
        <div
          class="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row"
        >
          <div class="md:w-1/2">
            <h2 class="mb-4 text-2xl font-semibold font-playfair">Misión</h2>
            <p>
              Nuestra misión es ofrecer jabones y velas artesanales elaborados
              con ingredientes naturales y procesos sostenibles, proporcionando
              bienestar, relajación y cuidado para la piel y el hogar. Nos
              comprometemos a crear productos únicos, libres de químicos
              agresivos, que nutran el cuerpo y la mente, respetando el medio
              ambiente y promoviendo un estilo de vida consciente.
            </p>
          </div>
          <div class="md:w-1/2">
            <img
              src="/SBjabones.png"
              alt="Misión"
              class="rounded-lg"
            />
          </div>
        </div>
      </section>

      <!-- Visión -->
      <section class="bg-purple-100 px-6 py-12">
        <div
          class="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row-reverse"
        >
          <div class="md:w-1/2">
            <h2 class="mb-4 text-2xl font-semibold font-playfair">Visión</h2>
            <p>
              Ser una marca reconocida por la calidad, autenticidad y compromiso
              sostenible de nuestros jabones y velas artesanales. Queremos
              inspirar a más personas a elegir productos naturales, expandiendo
              nuestro impacto en el bienestar y la sostenibilidad, mientras
              seguimos innovando con nuevas fragancias, texturas y experiencias
              sensoriales.
            </p>
          </div>
          <div class="md:w-1/2">
            <img
              src="/SBvelas.png"
              alt="Visión"
              class="rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  `,
})
export class AboutUsPage {}
