<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index() { return Inertia::render('admin/projects/index', ['items' => Project::orderBy('sort_order')->get(), 'resource' => 'projects']); }
    public function store(Request $request) { Project::create($this->validated($request)); return back()->with('success', 'Project created.'); }
    public function update(Request $request, Project $project) { $project->update($this->validated($request)); return back()->with('success', 'Project updated.'); }
    public function destroy(Project $project) { $project->delete(); return back()->with('success', 'Project deleted.'); }
    private function validated(Request $request): array { return $request->validate(['title' => 'required|string|max:255', 'client' => 'required|string|max:255', 'location' => 'required|string|max:255', 'year' => 'required|string|max:100', 'category' => 'required|string|max:255', 'scope_summary' => 'required|string', 'achievements' => 'required|array|min:1', 'achievements.*' => 'required|string|max:500', 'image' => 'required|string|max:500', 'featured' => 'required|boolean', 'sort_order' => 'required|integer|min:0|max:65535', 'is_active' => 'required|boolean']); }
}
