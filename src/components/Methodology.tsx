import { component$ } from "@builder.io/qwik";
import { LuDumbbell, LuHeart, LuFlower2, LuActivity, LuUsers } from "@qwikest/icons/lucide";

export interface MethodologyDay {
  title: string;
  desc: string;
  icon?: string;
}

export interface MethodologyProps {
  heading?: string;
  days?: MethodologyDay[];
}

const iconMap: Record<string, any> = {
  dumbbell: LuDumbbell,
  heart: LuHeart,
  flower: LuFlower2,
  activity: LuActivity,
  users: LuUsers,
};

export const MethodologySection = component$((props: MethodologyProps) => {
  const defaultDays = [
    {
      icon: "dumbbell",
      title: "Lunes: Fuerza",
      desc: "Construimos poder real con movimientos que importan.",
    },
    {
      icon: "heart",
      title: "Martes: Cardio",
      desc: "Liberamos energía y superamos tus límites mentales.",
    },
    {
      icon: "dumbbell",
      title: "Miércoles: Fuerza",
      desc: "Fortalecemos el cuerpo con movimientos funcionales.",
    },
    {
      icon: "flower",
      title: "Jueves: Calma Activa",
      desc: "Donde hay pausa, hay poder. Conectamos con el cuerpo.",
    },
    {
      icon: "activity",
      title: "Viernes: Fuerza",
      desc: "Cada repetición te acerca a la persona que quieres ser.",
    },
    {
      icon: "users",
      title: "Sábado: Libre con Sentido",
      desc: "El entorno también entrena. Disfruta el movimiento.",
    },
  ];

  const days = props.days || defaultDays;

  return (
    <section class="py-12 md:py-16 lg:py-24 bg-[#F5F5F7]">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold font-['Poppins'] text-center mb-12 md:mb-16 text-[#1A1A1A]">
          {props.heading || "Una Metodología con Propósito"}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {days.map((day, idx) => {
            const Icon = iconMap[day.icon || 'dumbbell'] || LuDumbbell;
            return (
              <div class="text-center" key={idx}>
                <div class="w-16 h-16 mx-auto mb-4 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                  <Icon class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-lg font-bold font-['Poppins'] mb-2 text-[#1e3a8a]">{day.title}</h3>
                <p class="text-[#4B4B4B] text-sm">{day.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}); 