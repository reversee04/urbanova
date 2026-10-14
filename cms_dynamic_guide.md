# Urbanova CMS — Step-by-Step Implementation Guide

> **Stack reminder:** Laravel 13 · Inertia.js v3 · React (TSX) · SQLite · Chisel (starter-kit)

---

## Overview — What We Are Building

We will make **four hardcoded sections dynamic** by wiring them to a lightweight CMS backed by SQLite:

| Section | Location | CMS Table |
|---|---|---|
| Hero Carousel slides | `herocarousel.tsx` (Home) | `hero_slides` |
| Selected Project Experience grid | `latestnewsgrid.tsx` (Home) | `projects` |
| Projects list | `projects.tsx` (Projects page) | `projects` (same table) |
| Team member cards | `team.tsx` (Team page) | `team_members` |

The flow is: **SQLite → Laravel Model → Controller → Inertia props → React component**.

---

## PART 1 — Database Layer (Migrations)

### Step 1 — Create the `hero_slides` migration

Run in terminal:
```bash
php artisan make:migration create_hero_slides_table
```

Open the generated file in `database/migrations/` and replace its `up()` body with:

```php
Schema::create('hero_slides', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description');
    $table->string('cta_text');
    $table->string('cta_url');
    $table->string('bg_image');          // URL or relative storage path
    $table->unsignedSmallInteger('sort_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Step 2 — Create the `projects` migration

```bash
php artisan make:migration create_projects_table
```

`up()` body:

```php
Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('client');
    $table->string('location');
    $table->string('year');
    $table->string('category');
    $table->text('scope_summary');
    $table->json('achievements');        // stored as JSON array
    $table->string('image');             // Unsplash URL or storage path
    $table->boolean('featured')->default(false); // show on home grid?
    $table->unsignedSmallInteger('sort_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

> [!NOTE]
> `featured` lets you control which projects appear in the `LatestNewsGrid` on the home page without a separate table.

### Step 3 — Create the `team_members` migration

```bash
php artisan make:migration create_team_members_table
```

`up()` body:

```php
Schema::create('team_members', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('role');
    $table->text('description');
    $table->string('image');
    $table->unsignedSmallInteger('sort_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### Step 4 — Run all migrations

```bash
php artisan migrate
```

---

## PART 2 — Eloquent Models

### Step 5 — Create `HeroSlide` model

```bash
php artisan make:model HeroSlide
```

Open `app/Models/HeroSlide.php` and set it up:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'title', 'description', 'cta_text', 'cta_url',
        'bg_image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Scope: only return active slides, ordered
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
```

### Step 6 — Create `Project` model

```bash
php artisan make:model Project
```

`app/Models/Project.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'client', 'location', 'year', 'category',
        'scope_summary', 'achievements', 'image',
        'featured', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'achievements' => 'array',   // auto JSON encode/decode
        'featured'     => 'boolean',
        'is_active'    => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true)->where('is_active', true)->orderBy('sort_order');
    }
}
```

### Step 7 — Create `TeamMember` model

```bash
php artisan make:model TeamMember
```

`app/Models/TeamMember.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'description', 'image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
```

---

## PART 3 — Controllers & Routes (Data Delivery via Inertia)

### Step 8 — Create `HomeController` (serves the homepage with CMS data)

```bash
php artisan make:controller HomeController
```

`app/Http/Controllers/HomeController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'slides'   => HeroSlide::active()->get(),
            'featured' => Project::featured()->limit(6)->get(),
        ]);
    }
}
```

### Step 9 — Create `ProjectsController` (serves the Projects page)

```bash
php artisan make:controller ProjectsController
```

`app/Http/Controllers/ProjectsController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('projects', [
            'projects'   => Project::active()->get(),
            'categories' => Project::active()
                                ->distinct()
                                ->pluck('category')
                                ->prepend('All')
                                ->values(),
        ]);
    }
}
```

### Step 10 — Create `TeamController` (serves the Team page)

```bash
php artisan make:controller TeamController
```

`app/Http/Controllers/TeamController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('team', [
            'members' => TeamMember::active()->get(),
        ]);
    }
}
```

### Step 11 — Update `routes/web.php`

Replace the static `Route::inertia()` calls for the affected routes with controller-based routes:

```php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TeamController;

// Replace these three static Inertia routes:
Route::get('/', HomeController::class)->name('home');
Route::get('/projects', ProjectsController::class)->name('projects');
Route::get('/team', TeamController::class)->name('team');

// Leave the rest as-is (about, services, contact can remain static for now)
```

---

## PART 4 — Update Frontend Components to Use Props

### Step 12 — Update `herocarousel.tsx` to accept props

Replace the hardcoded `slides` array with a prop received from Inertia:

```tsx
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface Slide {
  id: number;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  bg_image: string;
}

interface PageProps {
  slides: Slide[];
  [key: string]: unknown;
}

export const HeroCarousel: React.FC = () => {
  const { slides } = usePage<PageProps>().props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide];

  return (
    // ... keep all the existing JSX exactly the same ...
    // just swap every reference:
    //   slide.ctaText  → slide.cta_text
    //   slide.ctaUrl   → slide.cta_url
    //   slide.bgImage  → slide.bg_image
    // and update the dot indicator to use slides.length
  );
};
```

> [!IMPORTANT]
> The key change is swapping the hardcoded `const slides = [...]` for `const { slides } = usePage<PageProps>().props;`. The JSX template stays exactly the same — just update the snake_case field names from Laravel.

### Step 13 — Update `latestnewsgrid.tsx` to accept props

```tsx
import React from 'react';
import { usePage } from '@inertiajs/react';

interface Project {
  id: number;
  title: string;
  year: string;
  category: string;
  image: string;
}

interface PageProps {
  featured: Project[];
  [key: string]: unknown;
}

export const LatestNewsGrid: React.FC = () => {
  const { featured } = usePage<PageProps>().props;
  const articles = featured ?? [];

  // Keep the exact same JSX grid layout.
  // Replace the hardcoded `articles[0]`, `articles[1]` etc. references.
  // Access `article.year`, `article.category`, `article.image`, `article.title`
  // — these field names already match your existing ArticleCard interface.
};
```

### Step 14 — Update `projects.tsx` to accept props

At the top of the component, receive props from Inertia instead of using the hardcoded array:

```tsx
import { usePage } from '@inertiajs/react';

interface Project {
  id: number;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  scope_summary: string;   // ← snake_case from Laravel
  achievements: string[];
  image: string;
}

interface PageProps {
  projects: Project[];
  categories: string[];
  [key: string]: unknown;
}

export default function Projects() {
  const { projects, categories } = usePage<PageProps>().props;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // In JSX, replace `project.scopeSummary` → `project.scope_summary`
  // Everything else stays the same.
}
```

### Step 15 — Update `team.tsx` to accept props

```tsx
import { usePage } from '@inertiajs/react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;   // ← matches DB column name
  image: string;
}

interface PageProps {
  members: TeamMember[];
  [key: string]: unknown;
}

export default function Team() {
  const { members } = usePage<PageProps>().props;

  // Replace `teamMembers` array with `members` from props.
  // In JSX replace `member.desc` → `member.description`
}
```

---

## PART 5 — Seed Data (Minimum 6 Per Section)

### Step 16 — Create Factories

**Hero Slides factory:**
```bash
php artisan make:factory HeroSlideFactory --model=HeroSlide
```

`database/factories/HeroSlideFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class HeroSlideFactory extends Factory
{
    public function definition(): array
    {
        $unsplashIds = [
            'photo-1506744038136-46273834b3fb',
            'photo-1470071459604-3b5ec3a7fe05',
            'photo-1426604966848-d7adac402bff',
            'photo-1518005020951-eccb494ad742',
            'photo-1500382017468-9049fed747ef',
            'photo-1548839140-29a749e1cf4e',
        ];
        $img = $this->faker->randomElement($unsplashIds);

        return [
            'title'       => $this->faker->sentence(8),
            'description' => $this->faker->paragraph(2),
            'cta_text'    => $this->faker->randomElement(['Explore what we do', 'Discover our projects', 'Learn about our impact', 'Meet the team']),
            'cta_url'     => $this->faker->randomElement(['/services', '/projects', '/team', '/about']),
            'bg_image'    => "https://images.unsplash.com/{$img}?q=80&w=2000&auto=format&fit=crop",
            'sort_order'  => $this->faker->numberBetween(1, 10),
            'is_active'   => true,
        ];
    }
}
```

**Projects factory:**
```bash
php artisan make:factory ProjectFactory --model=Project
```

`database/factories/ProjectFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        $categories = [
            'Climate & Planning',
            'Logistics & Infrastructure',
            'Water & Utilities',
            'Agriculture & Resettlement',
            'Energy & Compliance',
        ];

        $images = [
            'photo-1500382017468-9049fed747ef',
            'photo-1586528116311-ad8dd3c8310d',
            'photo-1548839140-29a749e1cf4e',
            'photo-1506744038136-46273834b3fb',
            'photo-1527018601619-a508a2be00cd',
            'photo-1470071459604-3b5ec3a7fe05',
        ];

        $img = $this->faker->randomElement($images);

        return [
            'title'         => $this->faker->sentence(6),
            'client'        => $this->faker->company(),
            'location'      => $this->faker->city() . ', ' . $this->faker->country(),
            'year'          => (string) $this->faker->year(),
            'category'      => $this->faker->randomElement($categories),
            'scope_summary' => $this->faker->paragraph(2),
            'achievements'  => [
                $this->faker->sentence(10),
                $this->faker->sentence(10),
            ],
            'image'         => "https://images.unsplash.com/{$img}?q=80&w=1200&auto=format&fit=crop",
            'featured'      => $this->faker->boolean(50),
            'sort_order'    => $this->faker->numberBetween(1, 20),
            'is_active'     => true,
        ];
    }
}
```

**Team Members factory:**
```bash
php artisan make:factory TeamMemberFactory --model=TeamMember
```

`database/factories/TeamMemberFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TeamMemberFactory extends Factory
{
    public function definition(): array
    {
        $roles = [
            'Senior Environmental Specialist',
            'Social Safeguards Consultant',
            'GIS & Spatial Data Analyst',
            'Urban Planning Advisor',
            'Resettlement Specialist',
            'Civil Engineer',
            'M&E and Statistics Specialist',
            'Climate Resilience Advisor',
        ];

        $portraits = [
            'photo-1507003211169-0a1dd7228f2d',
            'photo-1500648767791-00dcc994a43e',
            'photo-1573496359142-b8d87734a5a2',
            'photo-1472099645785-5658abf4ff4e',
            'photo-1519085360753-af0119f7cbe7',
            'photo-1580489944761-15a19d654956',
            'photo-1506794778202-cad84cf45f1d',
            'photo-1534528741775-53994a69daeb',
            'photo-1560250097-0b93528c311a',
        ];

        $img = $this->faker->randomElement($portraits);

        return [
            'name'        => $this->faker->name(),
            'role'        => $this->faker->randomElement($roles),
            'description' => $this->faker->paragraph(2),
            'image'       => "https://images.unsplash.com/{$img}?q=80&w=800&auto=format&fit=crop",
            'sort_order'  => $this->faker->numberBetween(1, 20),
            'is_active'   => true,
        ];
    }
}
```

### Step 17 — Update `DatabaseSeeder.php` with Real + Faker Data

Open `database/seeders/DatabaseSeeder.php` and replace its content:

```php
<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use App\Models\Project;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ── Admin user ──────────────────────────────────────────────────────────
        User::factory()->create([
            'name'  => 'Urbanova Admin',
            'email' => 'admin@urbanova.mw',
        ]);

        // ── Hero Slides (6 real slides) ─────────────────────────────────────────
        $slides = [
            [
                'title'       => 'Trusted globally to deliver innovative, sustainable solutions',
                'description' => 'Provider of consultancy, technical services, research, innovation and training to clients in the water, environment, and urban planning sectors across Malawi and Southern Africa.',
                'cta_text'    => 'Explore what we do',
                'cta_url'     => '/services',
                'bg_image'    => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Pioneering clean energy and environmental stewardship',
                'description' => 'Empowering communities and businesses with cutting-edge ecological strategy, sustainability frameworks, and resource management solutions.',
                'cta_text'    => 'Discover our projects',
                'cta_url'     => '/projects',
                'bg_image'    => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 2,
            ],
            [
                'title'       => 'Building resilient water & waste infrastructure',
                'description' => 'Transforming global systems through research-backed engineering, policy advisory, and technological innovations for future generations.',
                'cta_text'    => 'Learn about our impact',
                'cta_url'     => '/projects',
                'bg_image'    => 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Delivering rigorous safeguards compliance across the region',
                'description' => 'Expert resettlement planning, environmental and social impact assessment, and World Bank ESF alignment for major infrastructure assignments.',
                'cta_text'    => 'Meet our team',
                'cta_url'     => '/team',
                'bg_image'    => 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Inclusive development advisory rooted in community',
                'description' => 'Integrating gender, youth, and vulnerable household perspectives into every project phase — from planning to implementation and monitoring.',
                'cta_text'    => 'Our approach',
                'cta_url'     => '/about',
                'bg_image'    => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Spatial intelligence powering smarter planning decisions',
                'description' => 'GIS-led analysis, drone mapping, parcel surveys, and digital spatial tools to support land use, flood zoning, and infrastructure planning.',
                'cta_text'    => 'View our services',
                'cta_url'     => '/services',
                'bg_image'    => 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?q=80&w=2000&auto=format&fit=crop',
                'sort_order'  => 6,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create(array_merge($slide, ['is_active' => true]));
        }

        // ── Projects (6 real + extras via factory) ──────────────────────────────
        $projects = [
            [
                'title'        => 'Climate-Resilient Land Use and Flood Zoning',
                'client'       => 'Environmental Affairs Department (EAD) / UNEP',
                'location'     => 'Malawi',
                'year'         => '2025 – Ongoing',
                'category'     => 'Climate & Planning',
                'scope_summary'=> 'Supporting climate-resilient land use and flood zoning work under UNEP funding, including zoning, flood and parcel data analysis, and climate adaptation indicators.',
                'achievements' => ['Zoning, flood, and parcel data analysis for climate adaptation', 'Relocation capacity estimates and land use planning policy support'],
                'image'        => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 1,
            ],
            [
                'title'        => 'Caála Logistics Platform Feasibility Study',
                'client'       => 'Regional Logistics Development Partners',
                'location'     => 'Caála, Angola',
                'year'         => '2025',
                'category'     => 'Logistics & Infrastructure',
                'scope_summary'=> 'Serving as ESIA Lead and Resettlement Specialist for the Caála Logistics Platform Project, ensuring alignment with World Bank Environmental and Social Standards.',
                'achievements' => ['Comprehensive environmental and social impact assessment', 'Stakeholder consultations and livelihood restoration planning'],
                'image'        => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 2,
            ],
            [
                'title'        => 'Salima - Lilongwe Water Project',
                'client'       => 'Lilongwe Water Board',
                'location'     => 'Salima to Lilongwe, Malawi',
                'year'         => 'Pre-feasibility Stage',
                'category'     => 'Water & Utilities',
                'scope_summary'=> 'Contributing to the pre-feasibility stage focusing on environmental and social analysis, community development planning, and European Investment Bank safeguards review.',
                'achievements' => ['Environmental and social analysis for bulk water infrastructure', 'Community development planning and EIB safeguards review'],
                'image'        => 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 3,
            ],
            [
                'title'        => 'Shire Valley Transformation Programme',
                'client'       => 'Ministry of Agriculture / Irrigation Development',
                'location'     => 'Lower Shire Valley, Malawi',
                'year'         => 'Major Irrigation Assignment',
                'category'     => 'Agriculture & Resettlement',
                'scope_summary'=> 'Serving as RAP Consultant and RAP Team Leader for major irrigation canal assignments under World Bank and AfDB safeguard requirements.',
                'achievements' => ['Execution of census, socio-economic surveys, and asset inventories', 'Entitlement planning, grievance redress, and livelihood restoration'],
                'image'        => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 4,
            ],
            [
                'title'        => 'Fuel Retail and Energy Compliance',
                'client'       => 'Brighto Filling Station',
                'location'     => 'Malawi',
                'year'         => 'Completed',
                'category'     => 'Energy & Compliance',
                'scope_summary'=> 'Providing environmental and social safeguards services, regulatory compliance support, and project advisory leading to MEPA clearance.',
                'achievements' => ['Successful acquisition of statutory MEPA environmental clearance', 'Efficient navigation of complex regulatory approval processes'],
                'image'        => 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 5,
            ],
            [
                'title'        => 'Nacala Corridor Railway Project',
                'client'       => 'Regional Rail Authorities',
                'location'     => 'Malawi – Mozambique Corridor',
                'year'         => 'Infrastructure Assignment',
                'category'     => 'Logistics & Infrastructure',
                'scope_summary'=> 'Supporting land acquisition, resettlement, stakeholder engagement, and social development coordination linked to railway rehabilitation.',
                'achievements' => ['Resettlement and land acquisition execution', 'Social investment coordination and community engagement'],
                'image'        => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
                'featured'     => true,
                'sort_order'   => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::create(array_merge($project, ['is_active' => true]));
        }

        // ── Team Members (9 real members) ───────────────────────────────────────
        $members = [
            ['name' => 'Hastings Jolotie Nyirenda',   'role' => 'Founder and Lead Consultant',                        'description' => 'Urban and regional planner, environmental and social safeguards specialist, resettlement specialist, and GIS practitioner with more than 15 years of professional experience.',                                                    'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', 'sort_order' => 1],
            ['name' => 'Langson Hawonga',              'role' => 'Senior Environmental, Health and Safety Expert',       'description' => 'Occupational Health and Safety and Environmental Health specialist with a Bachelor of Science in Environmental Health from the University of Malawi.',                                                                       'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', 'sort_order' => 2],
            ['name' => 'Walusungu Chipeta',            'role' => 'Senior Social and Gender Safeguards Specialist',       'description' => 'Specialist in stakeholder engagement, land acquisition, resettlement, grievance management, women\'s economic empowerment, and GBV risk management.',                                                                   'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 'sort_order' => 3],
            ['name' => 'Albert Rozario',               'role' => 'Senior Resettlement & Social Safeguards Specialist',   'description' => 'Specialist in land acquisition, RAP preparation and implementation, livelihood restoration, grievance redress, and construction-related safeguards compliance.',                                                       'image' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', 'sort_order' => 4],
            ['name' => 'William Rozario',              'role' => 'Social Development, Gender, & Field Safeguards Specialist', 'description' => 'Social Development Practitioner with extensive experience in RAP implementation, ESIA support, and stakeholder engagement on major infrastructure projects.',                                                  'image' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', 'sort_order' => 5],
            ['name' => 'Aisha Balakasi',               'role' => 'Civil Engineer and Infrastructure Specialist',         'description' => 'Civil Engineer with over seven years of experience in infrastructure planning, design review, construction supervision, contract management, and FIDIC contracts.',                                                      'image' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 'sort_order' => 6],
            ['name' => 'Dr Geoffrey Chiyuzga Singini', 'role' => 'Senior M&E, Statistics and Data Systems Specialist',  'description' => 'Statistician and biostatistician with 19 years of experience in study design, M&E systems, statistical modeling, data quality assurance, and predictive analytics.',                                                   'image' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', 'sort_order' => 7],
            ['name' => 'Cynthia Anna Phiri',           'role' => 'GIS Specialist and Land Surveyor',                    'description' => 'GIS Specialist and Land Surveyor holding a BSc in Land Surveying and a Certificate in Drone Technology from the African Drone and Data Academy.',                                                                      'image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', 'sort_order' => 8],
            ['name' => 'Thomas Magaisa',               'role' => 'Senior Agriculture, Livelihoods & Natural Resources Specialist', 'description' => 'Agriculture, natural resources, climate resilience, WASH, and livelihoods specialist with over 20 years of experience.',                                                                                'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', 'sort_order' => 9],
        ];

        foreach ($members as $member) {
            TeamMember::create(array_merge($member, ['is_active' => true]));
        }
    }
}
```

### Step 18 — Run the seeder

```bash
php artisan db:seed
```

Or to fresh-migrate AND seed (good for deployment):

```bash
php artisan migrate:fresh --seed
```

> [!TIP]
> Add `--seed` to the deployment `php artisan migrate` call in your `Dockerfile` or CI script to ensure seed data runs automatically on first deploy.

---

## PART 6 — Simple Admin CMS Panel (CRUD)

> [!NOTE]
> The project already has authentication (Fortify + Chisel starter kit). We just need admin-only CRUD routes behind the existing `auth` middleware.

### Step 19 — Create Admin Controllers

```bash
php artisan make:controller Admin/HeroSlideController --resource
php artisan make:controller Admin/ProjectController --resource
php artisan make:controller Admin/TeamMemberController --resource
```

Each controller follows the same pattern. Example for `HeroSlideController`:

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/hero-slides/index', [
            'slides' => HeroSlide::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'cta_text'    => 'required|string|max:100',
            'cta_url'     => 'required|string|max:255',
            'bg_image'    => 'required|string|max:500',
            'sort_order'  => 'integer',
            'is_active'   => 'boolean',
        ]);

        HeroSlide::create($data);
        return back()->with('success', 'Slide created.');
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $heroSlide->update($request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'cta_text'    => 'required|string|max:100',
            'cta_url'     => 'required|string|max:255',
            'bg_image'    => 'required|string|max:500',
            'sort_order'  => 'integer',
            'is_active'   => 'boolean',
        ]));

        return back()->with('success', 'Slide updated.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();
        return back()->with('success', 'Slide deleted.');
    }
}
```

Repeat the same CRUD structure for `ProjectController` and `TeamMemberController`.

### Step 20 — Register Admin Routes

Add to `routes/web.php` inside the existing `auth` middleware group:

```php
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TeamMemberController;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('hero-slides', HeroSlideController::class)->except(['show', 'create', 'edit']);
    Route::resource('projects', ProjectController::class)->except(['show', 'create', 'edit']);
    Route::resource('team-members', TeamMemberController::class)->except(['show', 'create', 'edit']);
});
```

> [!TIP]
> We skip `show`, `create`, and `edit` because the admin UI will be a SPA-style panel where forms are modals/inline, not separate pages.

### Step 21 — Create Admin React Pages (Pattern)

Create `resources/js/pages/admin/hero-slides/index.tsx` with a simple data table + modal form for CRUD. Use `useForm` from Inertia for the forms:

```tsx
import { useForm, usePage } from '@inertiajs/react';

const { slides } = usePage<{ slides: HeroSlide[] }>().props;
const { data, setData, post, put, delete: destroy } = useForm({ ... });
```

This pattern is identical for all three admin pages.

---

## PART 7 — Deployment Seeding Strategy

### Step 22 — Make seeding idempotent (safe to run multiple times)

Wrap each section in `DatabaseSeeder.php` with a guard:

```php
// Only seed if table is empty (idempotent)
if (HeroSlide::count() === 0) {
    foreach ($slides as $slide) {
        HeroSlide::create(array_merge($slide, ['is_active' => true]));
    }
}

if (Project::count() === 0) {
    foreach ($projects as $project) {
        Project::create(array_merge($project, ['is_active' => true]));
    }
}

if (TeamMember::count() === 0) {
    foreach ($members as $member) {
        TeamMember::create(array_merge($member, ['is_active' => true]));
    }
}
```

### Step 23 — Update the `composer.json` setup script

In your `composer.json` `"setup"` script, add `--seed`:

```json
"setup": [
    "composer install",
    "@php -r \"file_exists('.env') || copy('.env.example', '.env');\"",
    "@php artisan key:generate",
    "@php artisan migrate --force --seed",
    "npm install",
    "npm run build"
]
```

### Step 24 — Update `Dockerfile` (if deploying via Docker)

Find the `RUN php artisan migrate` line and change it to:

```dockerfile
RUN php artisan migrate --force --seed
```

---

## Quick Reference — File Change Summary

| File | Action |
|---|---|
| `database/migrations/*_create_hero_slides_table.php` | **CREATE** |
| `database/migrations/*_create_projects_table.php` | **CREATE** |
| `database/migrations/*_create_team_members_table.php` | **CREATE** |
| `app/Models/HeroSlide.php` | **CREATE** |
| `app/Models/Project.php` | **CREATE** |
| `app/Models/TeamMember.php` | **CREATE** |
| `app/Http/Controllers/HomeController.php` | **CREATE** |
| `app/Http/Controllers/ProjectsController.php` | **CREATE** |
| `app/Http/Controllers/TeamController.php` | **CREATE** |
| `app/Http/Controllers/Admin/HeroSlideController.php` | **CREATE** |
| `app/Http/Controllers/Admin/ProjectController.php` | **CREATE** |
| `app/Http/Controllers/Admin/TeamMemberController.php` | **CREATE** |
| `routes/web.php` | **EDIT** — swap static routes for controllers |
| `database/seeders/DatabaseSeeder.php` | **EDIT** — add all seed data |
| `database/factories/HeroSlideFactory.php` | **CREATE** |
| `database/factories/ProjectFactory.php` | **CREATE** |
| `database/factories/TeamMemberFactory.php` | **CREATE** |
| `resources/js/components/herocarousel.tsx` | **EDIT** — use `usePage` props |
| `resources/js/components/latestnewsgrid.tsx` | **EDIT** — use `usePage` props |
| `resources/js/pages/projects.tsx` | **EDIT** — use `usePage` props |
| `resources/js/pages/team.tsx` | **EDIT** — use `usePage` props |
| `resources/js/pages/admin/hero-slides/index.tsx` | **CREATE** |
| `resources/js/pages/admin/projects/index.tsx` | **CREATE** |
| `resources/js/pages/admin/team-members/index.tsx` | **CREATE** |

---

## Execution Order (TL;DR Checklist)

- [ ] 1. Create 3 migrations → `php artisan migrate`
- [ ] 2. Create 3 Eloquent models (with casts + scopes)
- [ ] 3. Create 3 public page controllers (`HomeController`, `ProjectsController`, `TeamController`)
- [ ] 4. Update `routes/web.php` to use controllers
- [ ] 5. Update 4 frontend files to consume Inertia props via `usePage`
- [ ] 6. Create 3 factories
- [ ] 7. Populate `DatabaseSeeder.php` with ≥6 real records per section
- [ ] 8. Run `php artisan db:seed`
- [ ] 9. Create 3 admin controllers + routes
- [ ] 10. Build admin CRUD React pages
- [ ] 11. Make seeding idempotent & add `--seed` to deployment scripts
