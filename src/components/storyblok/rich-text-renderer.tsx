import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface RichTextRendererProps {
    content: any;
}

export const RichTextRenderer = component$<RichTextRendererProps>(({ content }) => {
    if (!content) return null;

    // Handle array of nodes (top level)
    if (Array.isArray(content)) {
        return (
            <>
                {content.map((node: any, index: number) => (
                    <RichTextRenderer key={index} content={node} />
                ))}
            </>
        );
    }

    // Handle individual node types
    switch (content.type) {
        case "doc":
            return <RichTextRenderer content={content.content} />;

        case "paragraph":
            return (
                <p class="mb-6 text-gray-700 leading-relaxed text-lg">
                    {content.content ? <RichTextRenderer content={content.content} /> : <br />}
                </p>
            );

        case "bullet_list":
            return (
                <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700 marker:text-gray-400">
                    <RichTextRenderer content={content.content} />
                </ul>
            );

        case "ordered_list":
            return (
                <ol class="list-decimal pl-6 mb-6 space-y-2 text-gray-700 marker:text-gray-400">
                    <RichTextRenderer content={content.content} />
                </ol>
            );

        case "list_item":
            return (
                <li class="pl-1">
                    <RichTextRenderer content={content.content} />
                </li>
            );

        case "text": {
            let textContent: any = content.text;

            // Apply marks (bold, italic, strike, link, code, etc.)
            if (content.marks) {
                content.marks.forEach((mark: any) => {
                    switch (mark.type) {
                        case "bold":
                            textContent = <strong class="font-bold text-gray-900">{textContent}</strong>;
                            break;
                        case "italic":
                            textContent = <em class="italic">{textContent}</em>;
                            break;
                        case "strike":
                            textContent = <span class="line-through">{textContent}</span>;
                            break;
                        case "link":
                            textContent = (
                                <Link
                                    href={mark.attrs.href}
                                    target={mark.attrs.target}
                                    class="text-cyan-600 hover:text-cyan-700 underline underline-offset-2 transition-colors"
                                >
                                    {textContent}
                                </Link>
                            );
                            break;
                        case "code":
                            textContent = <code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600">{textContent}</code>;
                            break;
                    }
                });
            }
            return textContent;
        }

        case "heading": {
            const level = content.attrs?.level || 3;
            const commonClasses = "font-bold text-gray-900 mt-8 mb-4";

            if (level === 2) return <h2 class={`text-2xl ${commonClasses}`}><RichTextRenderer content={content.content} /></h2>;
            if (level === 3) return <h3 class={`text-xl ${commonClasses}`}><RichTextRenderer content={content.content} /></h3>;
            if (level === 4) return <h4 class={`text-lg ${commonClasses}`}><RichTextRenderer content={content.content} /></h4>;
            return <h5 class={`text-base ${commonClasses}`}><RichTextRenderer content={content.content} /></h5>;
        }

        default:
            // Fallback for unhandled types, try to render children if any
            if (content.content) {
                return <RichTextRenderer content={content.content} />;
            }
            return null;
    }
});
