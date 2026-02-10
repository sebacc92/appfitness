import { component$ } from "@builder.io/qwik";
import { BsWhatsapp } from "@qwikest/icons/bootstrap";

export default component$(() => {
  const phoneNumber = "+5491125358621";
  const message = encodeURIComponent(
    "¡Hola Fabián! Me interesa conocer más sobre tu programa de entrenamiento. ¿Podrías contarme cómo funciona el reto de 28 días?"
  );
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-button"
      title="Contactanos por WhatsApp"
    >
      <BsWhatsapp width="24" height="24" />
    </a>
  );
});
