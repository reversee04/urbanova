<?php

namespace Database\Factories;

use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<TeamMember> */
class TeamMemberFactory extends Factory
{
    public function definition(): array
    {
        return ['name' => fake()->name(), 'role' => fake()->jobTitle(), 'description' => fake()->paragraph(), 'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'sort_order' => fake()->numberBetween(0, 30), 'is_active' => true];
    }
}
