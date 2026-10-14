<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return ['title' => fake()->sentence(), 'client' => fake()->company(), 'location' => fake()->city(), 'year' => (string) fake()->year(), 'category' => fake()->randomElement(['Climate & Planning', 'Water & Utilities', 'Energy & Compliance']), 'scope_summary' => fake()->paragraph(), 'achievements' => [fake()->sentence(), fake()->sentence()], 'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 'featured' => false, 'sort_order' => fake()->numberBetween(0, 30), 'is_active' => true];
    }
}
