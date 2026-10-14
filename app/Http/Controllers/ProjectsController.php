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
            'projects' => Project::active()->get(),
            'categories' => Project::where('is_active', true)->select('category')->distinct()->orderBy('category')->pluck('category')->prepend('All')->values(),
        ]);
    }
}
