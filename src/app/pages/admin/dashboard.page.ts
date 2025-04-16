import { Component } from '@angular/core';

@Component({
  template: ` 
  <div class="bg-[#F6F5FD] w-full flex">
    <aside class="flex px-16 flex-col">
      <div class="flex items-center gap-6 py-6">
        <img src="logo.png" alt="Logo de Flor y Cera" class="w-[75px]" />
        <h1 class="font-playfair font-bold text-[20px] hidden lg:block ">
          Flor & Cera
        </h1>
      </div>
      <nav class="">
        <ul class="flex flex-col">
          <li class="flex gap-6 bg-[#806BFF] pl-6 py-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.111 7.35c-.56 0-1.097-.221-1.493-.615A2.1 2.1 0 0 1 0 5.25V2.1C0 1.543.222 1.009.618.615A2.12 2.12 0 0 1 2.111 0h4.222c.56 0 1.097.221 1.493.615s.618.928.618 1.485v3.15c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615zm0 13.65c-.56 0-1.097-.221-1.493-.615A2.1 2.1 0 0 1 0 18.9v-8.4c0-.557.222-1.091.618-1.485A2.12 2.12 0 0 1 2.111 8.4h4.222c.56 0 1.097.221 1.493.615s.618.928.618 1.485v8.4c0 .557-.222 1.091-.618 1.485A2.12 2.12 0 0 1 6.333 21zm10.556 0c-.56 0-1.097-.221-1.493-.615a2.1 2.1 0 0 1-.618-1.485v-2.1c0-.557.222-1.091.618-1.485a2.12 2.12 0 0 1 1.493-.615h4.222c.56 0 1.097.221 1.493.615S19 16.243 19 16.8v2.1c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615zm0-8.4c-.56 0-1.097-.221-1.493-.615a2.1 2.1 0 0 1-.618-1.485V2.1c0-.557.222-1.091.618-1.485A2.12 2.12 0 0 1 12.667 0h4.222c.56 0 1.097.221 1.493.615S19 1.543 19 2.1v8.4c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615z"
                fill="#3C3C3B"
              /></svg
            ><a href="#" class="active">Dashboard</a>
          </li>
          <li class="flex gap-6 pl-6 py-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M14.714 15.933v-1.08c1.338-.811 2.429-2.834 2.429-4.859 0-3.25 0-5.884-3.643-5.884S9.857 6.745 9.857 9.994c0 2.025 1.09 4.048 2.429 4.86v1.079C8.166 16.295 5 18.475 5 21.11h17c0-2.635-3.167-4.815-7.286-5.177"
                fill="#3C3C3B"
              />
              <path
                d="M6.234 16.36c1.053-.74 2.364-1.3 3.806-1.643a7.88 7.88 0 0 1-1.657-4.8c0-1.757 0-3.418.583-4.776C9.532 3.822 10.55 3.005 12 2.699 11.678 1.136 10.82.11 8.536.11c-3.658 0-3.658 2.636-3.658 5.885 0 2.025 1.095 4.048 2.438 4.86v1.079C3.18 12.295 0 14.475 0 17.11h5.315q.415-.396.919-.75"
                fill="#3C3C3B"
              /></svg
            ><a href="#">Usuarios</a>
          </li>
          <li class="flex gap-6 pl-6 py-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="21"
              fill="none"
            >
              <path
                d="M5.5 0H1.1C.808 0 .528.11.322.308A1.03 1.03 0 0 0 0 1.05v18.9c0 .279.116.546.322.742.206.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 5.5 0M3.3 19.95c-.435 0-.86-.123-1.222-.354a2.1 2.1 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.746.428.988.773s.371.752.371 1.167c0 .557-.232 1.091-.644 1.485a2.25 2.25 0 0 1-1.556.615m2.2-9.45H1.1V1.05h4.4zm-1.1 7.35c0 .208-.065.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743M13.2 0H8.8c-.292 0-.572.11-.778.308a1.03 1.03 0 0 0-.322.742v18.9c0 .279.116.546.322.742.206.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 13.2 0M11 19.95c-.435 0-.86-.123-1.222-.354a2.1 2.1 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.747.428.988.773.242.346.371.752.371 1.167 0 .557-.232 1.091-.644 1.485A2.25 2.25 0 0 1 11 19.95m2.2-9.45H8.8V1.05h4.4zm-1.1 7.35c0 .208-.064.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743M20.9 0h-4.4c-.292 0-.572.11-.778.308a1.03 1.03 0 0 0-.322.742v18.9c0 .279.116.546.322.742.207.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 20.9 0m-2.2 19.95c-.435 0-.86-.123-1.222-.354a2.13 2.13 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.747.428.988.773.242.346.371.752.371 1.167 0 .557-.232 1.091-.644 1.485a2.25 2.25 0 0 1-1.556.615m2.2-9.45h-4.4V1.05h4.4zm-1.1 7.35c0 .208-.065.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743"
                fill="#3C3C3B"
              /></svg
            ><a href="#">Productos</a>
          </li>
          <li class="flex gap-6 pl-6 py-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <mask
                id="a"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="22"
                height="23"
              >
                <path
                  d="M20 6.75 11 2 2 6.75v9.5L11 21l9-4.75z"
                  fill="#fff"
                  stroke="#fff"
                  stroke-width="2.167"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 10.55v3.8m4.235-5.7v5.7m-8.47-1.9v1.9"
                  stroke="#000"
                  stroke-width="2.167"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </mask>
              <g mask="url(#a)">
                <path d="M-1.706.1h25.412v22.8H-1.706z" fill="#3C3C3B" />
              </g></svg
            ><a href="#">Ventas</a>
          </li>
          <li class="flex gap-6 pl-6 py-4 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="m7.627 21-.418-3.36a4 4 0 0 1-.64-.315 9 9 0 0 1-.588-.394l-3.108 1.313L0 13.256l2.69-2.047a2.5 2.5 0 0 1-.026-.354v-.709q0-.17.026-.355L0 7.744l2.873-4.988L5.981 4.07q.288-.21.601-.394a5 5 0 0 1 .627-.315L7.627 0h5.746l.418 3.36q.34.131.64.315.302.184.588.394l3.108-1.313L21 7.744 18.31 9.79q.026.184.026.355v.708q0 .17-.052.355l2.69 2.047-2.873 4.988-3.082-1.313a7 7 0 0 1-.601.394 5 5 0 0 1-.627.315L13.373 21zm2.925-6.825q1.515 0 2.586-1.076A3.55 3.55 0 0 0 14.21 10.5a3.55 3.55 0 0 0-1.07-2.599 3.52 3.52 0 0 0-2.587-1.076q-1.54 0-2.6 1.076Q6.895 8.978 6.897 10.5q0 1.522 1.058 2.599 1.057 1.076 2.598 1.076"
                fill="#3C3C3B"
              /></svg
            ><a href="#">Configuración</a>
          </li>
        </ul>
      </nav>
    </aside>
    <!-- Contenido principal -->
    <main class="flex-1 flex flex-col ">
      <div class="bg-white rounded-[18px]">
        <h2>Dashboard</h2>
        <p><time datetime="2025-02-04">Lunes, 04 febrero</time></p>
        <p>Buenas tardes, Estefanía</p>
      </div>
      <header class="flex pt-6">
        <div class="bg-amarrillo-700">
          <img src="estefania.jpg" alt="Foto de Estefanía Sánchez" />
          <div>
            <p>Estefanía Sánchez</p>
            <span>Administradora</span>
          </div>
          <button>Salir</button>
        </div>
      </header>

      <section aria-labelledby="ventas-del-mes">
        <h3 id="ventas-del-mes">Ventas del mes</h3>
        <!-- Aquí iría un gráfico o lista de ventas -->
      </section>

      <aside class="resumen-estadisticas">
        <section aria-labelledby="usuarios-registrados">
          <h4 id="usuarios-registrados">Usuarios registrados</h4>
          <p><strong>64</strong> usuarios</p>
        </section>

        <section aria-labelledby="productos-vendidos">
          <h4 id="productos-vendidos">Productos vendidos</h4>
          <p><strong>29</strong> productos</p>
        </section>

        <section aria-labelledby="ingresos-mensuales">
          <h4 id="ingresos-mensuales">Ingresos obtenidos al mes</h4>
          <p><!-- cantidad o gráfico aquí --></p>
        </section>
      </aside>

      <footer>
        <p>Productos activos</p>
      </footer>
    </main>
  </div>`,
})
export class DashboardPage {}
