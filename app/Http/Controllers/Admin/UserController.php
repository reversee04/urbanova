<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/users/index', [
            'users' => User::orderBy('name')->get(['id', 'name', 'username', 'email', 'admin_role', 'created_at']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'username'   => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique(User::class)],
            'email'      => ['required', 'email', 'max:255', Rule::unique(User::class)],
            'password'   => 'required|string|min:8|confirmed',
            'admin_role' => ['required', Rule::in(['super_admin', 'content_manager', 'viewer'])],
        ]);

        User::create([
            'name'       => $data['name'],
            'username'   => $data['username'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'admin_role' => $data['admin_role'],
        ]);

        return back()->with('success', 'User created.');
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'username'   => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique(User::class)->ignore($user->id)],
            'email'      => ['required', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'admin_role' => ['required', Rule::in(['super_admin', 'content_manager', 'viewer'])],
        ]);

        $user->update($data);

        return back()->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        // Prevent deleting self
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account here.');
        }

        $user->delete();
        return back()->with('success', 'User deleted.');
    }

    public function resetPassword(Request $request, User $user)
    {
        $data = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update(['password' => Hash::make($data['password'])]);

        return back()->with('success', 'Password reset successfully.');
    }
}
