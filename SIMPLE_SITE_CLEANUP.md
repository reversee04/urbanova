# Files to remove for a simple website and minimal CMS

## Short answer

**You do not need to remove any files to start building the site.** This project
already has the Laravel, Inertia, React, and Tailwind pieces needed to serve
pages. The navigation and footer components you made can be reused as-is:

- `resources/js/components/site-nav.tsx`
- `resources/js/components/site-footer.tsx`

They are not automatically displayed yet. Put them in a shared public layout
or render them directly in the page that needs them.

## Change, don't delete

- **`resources/js/pages/welcome.tsx`** — `routes/web.php` serves this page at
  `/`. Replace its Laravel starter content with your homepage; deleting it
  without changing the route will break the home page.
- **`resources/js/app.tsx`** — keep this Inertia entry point. It loads pages
  and currently selects the public, authentication, and signed-in layouts.
  Add a public layout here if the nav and footer should appear across public
  pages.
- **`routes/web.php`** — keep the `/` route and add routes for additional site
  pages or CMS screens here.
- **`resources/views/app.blade.php`** — keep the shared HTML shell used by
  Inertia and Vite.

## Keep for a private, single-admin CMS

Keep the login/authentication flow and its backend. A CMS needs a protected
place to edit content; removing authentication would leave that area
unprotected. Keep the database and migrations as well. The existing project
does not yet provide content-management screens or content models, so those
need to be added separately.

The existing Teams feature is not necessary for a single-admin site, but it is
connected to routes, models, middleware, user relationships, and database
migrations. **Do not delete its files individually.** If you later decide to
remove Teams, first remove its routes and references as one planned change.
Keep migration history intact, especially if any migration has already run
against a database.

## Safe starting point

1. Keep both site components.
2. Replace the content in `resources/js/pages/welcome.tsx`.
3. Add other public pages under `resources/js/pages/` and routes in
   `routes/web.php`.
4. Keep authentication for the CMS, and add a protected content editor and
   content storage before treating it as a CMS.

For details on this project's page, layout, and styling conventions, see
[`FRONTEND_GUIDE.md`](./FRONTEND_GUIDE.md).
