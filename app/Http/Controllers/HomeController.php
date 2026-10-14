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
            'slides' => HeroSlide::active()->get(),
            'featured' => Project::featured()->limit(6)->get(),
        ]);
    }
}
