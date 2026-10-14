<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\Project;
use App\Models\TeamInvitation;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $email = strtolower($request->user()->email);

        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'stats' => [
                'heroSlides'  => HeroSlide::count(),
                'projects'    => Project::count(),
                'teamMembers' => TeamMember::count(),
                'activeSlides'   => HeroSlide::where('is_active', true)->count(),
                'activeProjects' => Project::where('is_active', true)->count(),
            ],
            'recentProjects' => Project::orderByDesc('created_at')->limit(5)->get(['id','title','client','category','is_active']),
        ]);
    }
}
