import { Component } from '@angular/core';
import { Headers } from "../components/header.component";
import { Footeer } from "../components/footer.component";

@Component({
  template: `
		<headers />
    <section class="p-10 text-gray-900">
      <strong>Términos y Condiciones</strong>
      <br />
      <p>
        Estos términos y condiciones se aplican a la aplicación Flor & Cera (en
        adelante, la "Aplicación") para dispositivos móviles, creada por Flor &
        Cera (en adelante, el "Proveedor del Servicio") como un servicio
        gratuito.
      </p>
      <br />

      <p>
        Al descargar o utilizar la Aplicación, aceptas automáticamente los
        siguientes términos. Se recomienda encarecidamente que leas y comprendas
        completamente estos términos antes de usar la Aplicación. Está
        estrictamente prohibido copiar o modificar la Aplicación, cualquier
        parte de ella o nuestras marcas registradas sin autorización. No está
        permitido intentar extraer el código fuente de la Aplicación, traducirla
        a otros idiomas ni crear versiones derivadas. Todas las marcas
        registradas, derechos de autor, derechos sobre bases de datos y otros
        derechos de propiedad intelectual relacionados con la Aplicación siguen
        siendo propiedad del Proveedor del Servicio.
      </p>
      <br />

      <p>
        El Proveedor del Servicio se compromete a garantizar que la Aplicación
        sea lo más útil y eficiente posible. Por lo tanto, se reserva el derecho
        de modificar la Aplicación o cobrar por sus servicios en cualquier
        momento y por cualquier motivo. El Proveedor del Servicio te asegura que
        cualquier cobro por la Aplicación o sus servicios será claramente
        comunicado.
      </p>
      <br />

      <p>
        La Aplicación almacena y procesa datos personales que tú has
        proporcionado al Proveedor del Servicio con el fin de ofrecer el
        Servicio. Es tu responsabilidad mantener la seguridad de tu teléfono y
        el acceso a la Aplicación. El Proveedor del Servicio recomienda
        encarecidamente no hacer "jailbreak" ni "rooting" de tu teléfono, lo
        cual implica eliminar las restricciones impuestas por el sistema
        operativo oficial del dispositivo. Estas acciones pueden exponer tu
        teléfono a malware, virus, programas maliciosos, comprometer sus
        funciones de seguridad y hacer que la Aplicación no funcione
        correctamente o deje de hacerlo.
      </p>

      <div>
        <p>
          Ten en cuenta que la Aplicación utiliza servicios de terceros que
          tienen sus propios Términos y Condiciones. A continuación, se
          presentan los enlaces a los Términos y Condiciones de los proveedores
          de servicios de terceros utilizados por la Aplicación:
        </p>
        <ul>
          <li>
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Servicios de Google Play
            </a>
          </li>
          <li>
            <a
              href="https://expo.io/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Expo
            </a>
          </li>
        </ul>
      </div>
      <br />

      <p>
        Ten en cuenta que el Proveedor del Servicio no se hace responsable de
        ciertos aspectos. Algunas funciones de la Aplicación requieren una
        conexión activa a internet, ya sea mediante Wi-Fi o a través de tu
        proveedor de red móvil. El Proveedor del Servicio no puede
        responsabilizarse si la Aplicación no funciona plenamente por falta de
        acceso a Wi-Fi o por haber agotado tu plan de datos.
      </p>
      <br />

      <p>
        Si usas la Aplicación fuera de una zona con Wi-Fi, debes tener en cuenta
        que los términos de tu contrato con el proveedor de red móvil aún se
        aplican. En consecuencia, puedes incurrir en cargos por el uso de datos
        durante la conexión a la Aplicación u otros cargos de terceros. Al usar
        la Aplicación, aceptas la responsabilidad de estos posibles cargos,
        incluidos los de itinerancia si usas la Aplicación fuera de tu país o
        región sin desactivar el roaming. Si no eres el titular de la cuenta del
        dispositivo en el que utilizas la Aplicación, se asume que cuentas con
        su autorización.
      </p>
      <br />

      <p>
        Del mismo modo, el Proveedor del Servicio no siempre puede asumir
        responsabilidad por el uso que hagas de la Aplicación. Por ejemplo, es
        tu responsabilidad asegurarte de que tu dispositivo esté cargado. Si se
        agota la batería y no puedes acceder al Servicio, el Proveedor del
        Servicio no será responsable.
      </p>
      <br />

      <p>
        En cuanto a la responsabilidad del Proveedor del Servicio sobre tu uso
        de la Aplicación, es importante tener en cuenta que, si bien se esfuerza
        por mantener la aplicación actualizada y precisa, depende de terceros
        para proporcionar información que pone a tu disposición. El Proveedor
        del Servicio no acepta responsabilidad alguna por pérdidas, directas o
        indirectas, que resulten de la confianza exclusiva en esta funcionalidad
        de la Aplicación.
      </p>
      <br />

      <p>
        El Proveedor del Servicio puede decidir actualizar la Aplicación en
        algún momento. Actualmente, la Aplicación está disponible según los
        requisitos del sistema operativo (y de cualquier otro sistema al que
        decidan extender su disponibilidad). Si deseas seguir utilizándola,
        deberás descargar las actualizaciones. El Proveedor del Servicio no
        garantiza que siempre actualice la Aplicación para que sea relevante
        para ti o compatible con la versión específica del sistema operativo de
        tu dispositivo. Sin embargo, aceptas instalar las actualizaciones que se
        te ofrezcan. El Proveedor del Servicio también puede dejar de ofrecer la
        Aplicación y finalizar su uso en cualquier momento sin previo aviso.
        Salvo que se indique lo contrario, tras dicha finalización: (a) los
        derechos y licencias otorgados en estos términos finalizarán; (b)
        deberás dejar de usar la Aplicación y, si es necesario, eliminarla de tu
        dispositivo.
      </p>
      <br />

      <strong>Cambios en estos Términos y Condiciones</strong>
      <p>
        El Proveedor del Servicio puede actualizar periódicamente estos Términos
        y Condiciones. Por lo tanto, se recomienda revisar esta página con
        regularidad. Se te notificará sobre cualquier cambio publicando los
        nuevos Términos y Condiciones en esta página.
      </p>
      <br />

      <p>
        Estos términos y condiciones están vigentes desde el 13 de julio de
        2025.
      </p>
      <br />

      <strong>Contáctanos</strong>
      <p>
        Si tienes alguna pregunta o sugerencia sobre estos Términos y
        Condiciones, no dudes en contactar al Proveedor del Servicio al correo:
        {{ 'jhonmata0427@gmail.com' }}
      </p>
    </section>
		<footeer />
  `,
  imports: [Headers, Footeer],
})
export class PolicyPage {}
