<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use App\Http\Middleware\EnsureAdminRole;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/services', 'services')->name('services');
Route::get('/projects', ProjectsController::class)->name('projects');
Route::get('/team', TeamController::class)->name('team');
Route::inertia('/contact', 'contact')->name('contact');

Route::prefix('{current_team}')
    ->middleware(['auth', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

Route::middleware(['auth', EnsureAdminRole::class.':super_admin,content_manager,viewer'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::put('security', [AdminProfileController::class, 'updatePassword'])->name('security.update');
    Route::get('security', fn () => inertia('admin/security'))->name('security.edit');

    Route::middleware(EnsureAdminRole::class.':super_admin,content_manager')->group(function () {
        Route::resource('hero-slides', HeroSlideController::class)->parameters(['hero-slides' => 'heroSlide'])->except(['show', 'create', 'edit']);
        Route::resource('projects', AdminProjectController::class)->except(['show', 'create', 'edit']);
        Route::resource('team-members', TeamMemberController::class)->parameters(['team-members' => 'teamMember'])->except(['show', 'create', 'edit']);
    });

    Route::middleware(EnsureAdminRole::class.':super_admin')->group(function () {
        Route::resource('users', UserController::class)->except(['show', 'create', 'edit']);
        Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
    });
});

require __DIR__.'/settings.php';
