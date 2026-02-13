import { component$ } from '@builder.io/qwik';
import { storyblokEditable } from '@storyblok/js';
import StoryblokComponent from '../component';

export default component$(({ blok }: { blok: any }) => {
    return (
        <div
            {...storyblokEditable(blok)}
            class="p-4 rounded-lg bg-slate-50 border-2 border-dashed border-slate-200"
        >
            {blok.label && (
                <h3 class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                    {blok.label}
                </h3>
            )}
            <div class="flex flex-col gap-4">
                {blok.items?.map((item: any, index: number) => (
                    <div key={item._uid}>
                        {index > 0 && (
                            <div class="relative flex items-center py-2">
                                <div class="flex-grow border-t border-slate-200"></div>
                                <span class="flex-shrink-0 mx-4 text-xs font-medium text-slate-400">— O —</span>
                                <div class="flex-grow border-t border-slate-200"></div>
                            </div>
                        )}
                        <StoryblokComponent blok={item} />
                    </div>
                ))}
            </div>
        </div>
    );
});
