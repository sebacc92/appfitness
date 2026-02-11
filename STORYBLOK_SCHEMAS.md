# Storyblok Schemas

Use this guide to manually configure your Space in Storyblok.

## General Notes
- **Component Names**: Use the exact names listed (e.g., `hero`, `about_section`).
- **Nesting**: Some components require nested blocks (allow only specific components in those fields).
- **Images**: Use the "Asset" type for images.

---

## 1. Hero Component (`hero`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `heading` | Text | Yes | Main title text. |
| `subheading` | Textarea | Yes | Subtitle or description text. |
| `image` | Asset | Yes | Background image. |
| `link_text` | Text | No | Text for the CTA button. |
| `link_url` | Multilink | No | Link for the CTA button. |

---

## 2. About Component (`about_section`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `heading` | Text | Yes | Section title (e.g., "Sobre Mí"). |
| `subheading` | Textarea | Yes | Short intro text. |
| `role` | Text | Yes | Role title (e.g., "Entrenador Personal"). |
| `description` | Rich Text | Yes | Main bio content. |
| `image` | Asset | Yes | Profile image. |

---

## 3. Methodology Component (`methodology`)

This component has a nested block list for the days.

### Main Component (`methodology`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `heading` | Text | Yes | Section title (e.g., "Una Metodología con Propósito"). |
| `days` | Blocks | Yes | Allow only `methodology_day` components here. |

### Nested Component (`methodology_day`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | Text | Yes | e.g., "Lunes: Fuerza". |
| `description` | Textarea | Yes | Short description of the day's focus. |
| `icon` | Text | Yes | Must be one of: `dumbbell`, `heart`, `flower`, `activity`, `users`. |

---

## 4. Testimonials Component (`testimonials_section`)

### Main Component (`testimonials_section`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `heading` | Text | Yes | Section title. |
| `testimonials` | Blocks | Yes | Allow only `testimonial_item` components. |

### Nested Component (`testimonial_item`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | Text | Yes | Client name. |
| `title` | Text | Yes | Client title/result (e.g., "-10kg in 3 months"). |
| `quote` | Textarea | Yes | The testimonial text. |
| `before_image` | Asset | No | "Before" transformation photo. |
| `after_image` | Asset | No | "After" transformation photo. |

---

## 5. FAQ Component (`faq_section`)

### Main Component (`faq_section`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `heading` | Text | Yes | Section title. |
| `subheading` | Textarea | Yes | Intro text. |
| `faqs` | Blocks | Yes | Allow only `faq_item` components. |

### Nested Component (`faq_item`)

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `question` | Text | Yes | The question. |
| `answer` | Textarea | Yes | The answer. |
