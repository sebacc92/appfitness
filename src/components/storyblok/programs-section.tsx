import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { storyblokEditable, type SbBlokData, renderRichText } from "@storyblok/js";
import { usePrograms } from "~/routes/layout";
import { LuDumbbell } from "@qwikest/icons/lucide";

interface ProgramsSectionBlok extends SbBlokData {
    heading?: string;
    subheading?: string;
}

interface Props {
    blok: ProgramsSectionBlok;
}

export default component$<Props>((props) => {
    const programsSignal = usePrograms();
    const programs = programsSignal.value;

    return (
        <section id="programas" {...storyblokEditable(props.blok)} class="py-16 md:py-24 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-['Poppins'] text-[#1A1A1A] mb-4">
                        {props.blok.heading || "Nuestros Programas"}
                    </h2>
                    {props.blok.subheading && (
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            {props.blok.subheading}
                        </p>
                    )}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program: any) => {
                        const content = program.content;
                        const isTrial = (Number(content.trial_days) || 0) > 0;

                        return (
                            <div key={program.uuid} class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                                {/* Image */}
                                <div class="relative h-64 overflow-hidden">
                                    {content.cover_image?.filename ? (
                                        <img
                                            src={content.cover_image.filename}
                                            alt={content.cover_image.alt || content.title}
                                            class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                            width={400}
                                            height={256}
                                        />
                                    ) : (
                                        <div class="w-full h-full bg-cyan-100 flex items-center justify-center">
                                            <LuDumbbell class="w-16 h-16 text-cyan-300" />
                                        </div>
                                    )}

                                    {/* Badge */}
                                    {isTrial && (
                                        <div class="absolute top-4 right-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                                            {content.trial_days} Días Gratis
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div class="p-6 flex-1 flex flex-col">
                                    <h3 class="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">
                                        {content.title || program.name}
                                    </h3>

                                    {/* Description truncated */}
                                    {content.description && (
                                        <div
                                            class="text-gray-600 text-sm mb-6 line-clamp-3 flex-1 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={typeof content.description === 'string'
                                                ? content.description
                                                : renderRichText(content.description)}
                                        />
                                    )}

                                    <div class="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                                        {/* Price */}
                                        <div class="text-gray-900">
                                            {content.price ? (
                                                <>
                                                    <span class="text-sm text-gray-500 block">Precio</span>
                                                    <span class="text-2xl font-bold">
                                                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(Number(content.price))}
                                                    </span>
                                                </>
                                            ) : (
                                                <span class="text-xl font-bold text-cyan-600">Gratis</span>
                                            )}
                                        </div>

                                        {/* Link Button */}
                                        <Link
                                            href={`/program/${program.slug}`}
                                            class="inline-flex items-center justify-center bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                                        >
                                            Ver Programa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {programs.length === 0 && (
                        <div class="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <LuDumbbell class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p class="text-gray-500 text-lg">No se encontraron programas en la carpeta 'programs/'.</p>
                            <p class="text-xs text-gray-400 mt-2">Verifica que tus historias estén creadas y en modo 'Draft' o 'Published' y que el token de API sea correcto.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
});