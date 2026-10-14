<?php

namespace Database\Factories;

use App\Models\HeroSlide;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<HeroSlide> */
class HeroSlideFactory extends Factory
{
    public function definition(): array
    {
        return ['title' => fake()->sentence(8), 'description' => fake()->paragraph(), 'cta_text' => 'Explore our work', 'cta_url' => '/projects', 'bg_image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 'sort_order' => fake()->numberBetween(0, 20), 'is_active' => true];
    }
}
