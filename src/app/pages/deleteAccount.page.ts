import { Component } from '@angular/core';
import { Headers } from "../components/header.component";
import { Footeer } from "../components/footer.component";

@Component({
  template: `
		<headers />
    <section class="p-10 text-gray-900">
      <strong>Eliminar Cuenta</strong>
			<br />
			<p>
				Para eliminar tu cuenta de nuestros servicios Flor & Cera, por favor ten en
				cuenta que esta acción es irreversible y eliminará todos tus datos
				asociados a la cuenta, incluyendo tus pedidos, preferencias y cualquier
				información personal almacenada.
			</p>
			<br />
			<p>
				Para proceder con la eliminación de tu cuenta, por favor contacta a
				nuestro equipo de soporte al cliente a través del correo electrónico:
				{{ 'jhonmata0427@gmail.com' }}
			</p>

			<p>
				Una vez que recibamos tu solicitud, procesaremos la eliminación de tu
				cuenta y te enviaremos una confirmación por el mismo medio.
			</p>
			<br />
		<footeer />
  `,
  imports: [Headers, Footeer],
})
export class DeleteAccount {}
