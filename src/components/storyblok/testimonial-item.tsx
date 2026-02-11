import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { LuStar } from "@qwikest/icons/lucide";

export interface TestimonialItemBlok extends SbBlokData {
    name: string;
    title: string;
    quote: string;
    rating?: number;
    before_image?: { filename: string; alt?: string };
    after_image?: { filename: string; alt?: string };
}

interface Props {
    blok: TestimonialItemBlok;
}

export default component$<Props>((props) => {
    const rating = props.blok.rating ?? 5;

    return (
        <div {...storyblokEditable(props.blok)} class="max-w-4xl mx-auto mb-12 last:mb-0">
            <div class="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow">
                {/* Before and After Images */}
                {(props.blok.before_image?.filename || props.blok.after_image?.filename) && (
                    <div class="flex justify-center mb-8">
                        <div class="relative max-w-4xl">
                            <div class="flex">
                                {props.blok.before_image?.filename && (
                                    <div class="relative w-1/2">
                                        <img
                                            src={props.blok.before_image.filename}
                                            alt={props.blok.before_image.alt || `${props.blok.name} - Antes`}
                                            class="w-full h-96 object-cover rounded-l-lg shadow-md"
                                            width={600}
                                            height={384}
                                        />
                                        <div class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                                            ANTES
                                        </div>
                                    </div>
                                )}
                                {props.blok.after_image?.filename && (
                                    <div class="relative w-1/2">
                                        <img
                                            src={props.blok.after_image.filename}
                                            alt={props.blok.after_image.alt || `${props.blok.name} - Después`}
                                            class="w-full h-96 object-cover rounded-r-lg shadow-md"
                                            width={600}
                                            height={384}
                                        />
                                        <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                                            DESPUÉS
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Testimonial Content */}
                <div class="max-w-2xl mx-auto">
                    <h3 class="font-bold text-2xl mb-2 text-[#1e3a8a]">{props.blok.name}</h3>
                    <p class="font-semibold mb-4 text-[#1d4ed8] text-lg">{props.blok.title}</p>
                    <div class="flex justify-center mb-4">
                        {[...Array(rating)].map((_, i) => (
                            <LuStar key={i} class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p class="text-[#4B4B4B] text-base italic leading-relaxed">"{props.blok.quote}"</p>
                </div>
            </div>
        </div>
    );
});
