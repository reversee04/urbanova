<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index() { return Inertia::render('admin/hero-slides/index', ['items' => HeroSlide::orderBy('sort_order')->get(), 'resource' => 'hero-slides']); }
    public function store(Request $request) { HeroSlide::create($this->validated($request)); return back()->with('success', 'Slide created.'); }
    public function update(Request $request, HeroSlide $heroSlide) { $heroSlide->update($this->validated($request)); return back()->with('success', 'Slide updated.'); }
    public function destroy(HeroSlide $heroSlide) { $heroSlide->delete(); return back()->with('success', 'Slide deleted.'); }
    private function validated(Request $request): array { return $request->validate(['title' => 'required|string|max:255', 'description' => 'required|string', 'cta_text' => 'required|string|max:100', 'cta_url' => 'required|string|max:255', 'bg_image' => 'required|string|max:500', 'sort_order' => 'required|integer|min:0|max:65535', 'is_active' => 'required|boolean']); }
}
