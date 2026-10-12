# Pages, components, and Tailwind CSS

This project uses **Laravel + Inertia + React/TypeScript**. Its page components
are React files (`.tsx`), not Blade templates. `resources/views/app.blade.php` is
the shared HTML shell that starts Inertia; you usually do not put your site's
page content there.

## Where to put pages

Put Inertia pages in `resources/js/pages/`. The current home page is
`resources/js/pages/welcome.tsx`, and `routes/web.php` serves it at `/`:

```php
Route::inertia('/', 'welcome')->name('home');
```

The second argument, `welcome`, matches the page file name and is case-sensitive.
For example, create `resources/js/pages/about.tsx` and add this in
`routes/web.php` to serve it at `/about`:

```php
Route::inertia('/about', 'about')->name('about');
```

For pages that need server-side data or other logic, use a Laravel controller
and render the matching Inertia page from it instead.

## Where to put reusable components

Put reusable React components in `resources/js/components/`. For example:

```text
resources/js/
  components/
    site-nav.tsx
    site-footer.tsx
  layouts/
    public-layout.tsx
  pages/
    welcome.tsx
    about.tsx
```

Use PascalCase for React component names. Import a component with the project's
`@/` alias:

```tsx
import SiteNav from '@/components/site-nav';
```

Then render it like any other React component:

```tsx
<SiteNav />
```

## Put shared navigation and footer in a layout

If several pages share the same nav and footer, create a layout component. It
can wrap each page's content:

```tsx
import type { ReactNode } from 'react';
import SiteFooter from '@/components/site-footer';
import SiteNav from '@/components/site-nav';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
```

In this project, `resources/js/app.tsx` currently returns `null` as the layout
for the `welcome` page. That means the page does not automatically get the
authenticated app layout. To use the public layout above on `welcome` and
`about`, import it in `resources/js/app.tsx` and select it for those page names:

```tsx
import PublicLayout from '@/layouts/public-layout';

// Inside the existing layout function:
case name === 'welcome' || name === 'about':
    return PublicLayout;
```

Keep that case before the existing authentication/settings cases. You can also
put `<SiteNav />` and `<SiteFooter />` directly in `welcome.tsx` if they should
only appear on that one page. Avoid putting site navigation in `app-layout.tsx`
unless it should also appear throughout the signed-in application.

## Link between pages

Use Inertia's `Link` component for internal links so navigation stays within
the Inertia app:

```tsx
import { Link } from '@inertiajs/react';

<Link href="/">Home</Link>
<Link href="/about">About</Link>
```

Use a regular `<a href="...">` for external websites. In a nav component, put
these links inside a `<nav>` element and give each one a clear accessible name.

## Use Tailwind CSS

Tailwind CSS is already installed and configured in this project:

- `tailwindcss` and `@tailwindcss/vite` are in `package.json`.
- The Tailwind Vite plugin is enabled in `vite.config.ts`.
- `resources/css/app.css` imports Tailwind with `@import 'tailwindcss';`.
- `resources/views/app.blade.php` loads that CSS through the existing `@vite`
  directive.

So you do **not** need to install Tailwind or add a separate config file to use
it. Add utility classes to React elements with `className`:

```tsx
<header className="flex items-center justify-between bg-white px-6 py-4 shadow">
    <Link href="/" className="text-lg font-semibold text-gray-900">
        Urbanova
    </Link>
</header>
```

You can also use Tailwind classes in Blade templates. For project-wide custom
CSS, edit `resources/css/app.css`; use ordinary CSS there or Tailwind's CSS-first
theme/customization features already supported by this setup.

## Run the app

In separate terminals, start Laravel and Vite:

```sh
php artisan serve
npm run dev
```

For a production asset build, run:

```sh
npm run build
```
