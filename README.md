# Shopify Vite Starter

A modern Shopify theme development starter using Vite, PostCSS, and Tailwind CSS.

## Project Structure

```
src/
├── core/           # Main entry points
├── styles/         # CSS files
│   ├── global/     # Global styles
│   ├── components/ # Component styles
│   ├── sections/   # Section-specific styles
│   └── pages/      # Page-specific styles
└── js/            # JavaScript files
    ├── global/     # Global JavaScript
    ├── components/ # Component JavaScript
    ├── sections/   # Section-specific JavaScript
    └── pages/      # Page-specific JavaScript
```

## Features

-   🚀 Vite for fast development and optimized builds
-   🎨 Tailwind CSS for utility-first styling
-   📦 PostCSS with nesting support
-   🧩 Individual section CSS and JS exports
-   🔄 Hot Module Replacement (HMR)
-   🏗️ Optimized production builds

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Usage

### Adding Styles

1. Global styles: Add to `src/styles/global/index.css`
2. Component styles: Add to `src/styles/components/index.css`
3. Section styles: Create new files in `src/styles/sections/`
4. Page styles: Create new files in `src/styles/pages/`

### Adding JavaScript

1. Global JS: Add to `src/js/global/index.js`
2. Component JS: Add to `src/js/components/index.js`
3. Section JS: Create new files in `src/js/sections/`
4. Page JS: Create new files in `src/js/pages/`

### Including Assets in Theme

Use the `vite` snippet to include your assets in your theme files:

```liquid
{% render 'vite' with 'styles/global/index.css' %}
{% render 'vite' with 'js/global/index.js' %}
```

For sections:

```liquid
{% render 'vite' with 'sections/your-section.css' %}
{% render 'vite' with 'sections/your-section.js' %}
```

## CSS Features

### Tailwind CSS

Use Tailwind's utility classes directly in your HTML:

```html
<div class="container mx-auto px-4 py-8">
	<h1 class="text-2xl font-bold text-gray-900">Hello World</h1>
</div>
```

### CSS Nesting

Use modern CSS nesting in your styles:

```css
.card {
	@apply bg-white rounded-lg shadow-md;

	&:hover {
		@apply shadow-lg;
	}

	.title {
		@apply text-xl font-bold;
	}
}
```

## JavaScript Features

### Section JavaScript

Create section-specific JavaScript files that are automatically bundled:

```javascript
// src/js/sections/hero.js
export const initHero = () => {
	const hero = document.querySelector(".hero");
	if (!hero) return;

	// Your section JavaScript here
};
```

## Development

-   Development server runs on `http://localhost:5173`
-   HMR is enabled for both CSS and JavaScript
-   Changes are automatically reflected in your Shopify theme

## Production

-   Assets are automatically optimized and minified
-   CSS is purged of unused styles
-   JavaScript is tree-shaken and bundled
-   Each section's assets are exported individually for better performance

## Configuration

The project uses the following configuration files:

-   `vite.config.js` - Vite configuration
-   `postcss.config.js` - PostCSS configuration
-   `tailwind.config.js` - Tailwind CSS configuration

## License

MIT
