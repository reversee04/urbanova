<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index() { return Inertia::render('admin/team-members/index', ['items' => TeamMember::orderBy('sort_order')->get(), 'resource' => 'team-members']); }
    public function store(Request $request) { TeamMember::create($this->validated($request)); return back()->with('success', 'Team member created.'); }
    public function update(Request $request, TeamMember $teamMember) { $teamMember->update($this->validated($request)); return back()->with('success', 'Team member updated.'); }
    public function destroy(TeamMember $teamMember) { $teamMember->delete(); return back()->with('success', 'Team member deleted.'); }
    private function validated(Request $request): array { return $request->validate(['name' => 'required|string|max:255', 'role' => 'required|string|max:255', 'description' => 'required|string', 'image' => 'required|string|max:500', 'sort_order' => 'required|integer|min:0|max:65535', 'is_active' => 'required|boolean']); }
}
