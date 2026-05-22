<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'is_active' => true,
        ]);

        return redirect()->route('profile.edit')->with('success', 'User created successfully.');
    }

    public function toggleActive(User $user)
    {
        // Prevent deactivating user id=1 (super admin)
        if ($user->id === 1) {
            return redirect()->route('profile.edit')->with('error', 'Cannot deactivate the super admin account.');
        }

        $user->update(['is_active' => !$user->is_active]);

        return redirect()->route('profile.edit')->with('success', 'User status updated.');
    }

    public function destroy(User $user)
    {
        // Prevent deleting user id=1
        if ($user->id === 1) {
            return redirect()->route('profile.edit')->with('error', 'Cannot delete the super admin account.');
        }

        $user->delete();

        return redirect()->route('profile.edit')->with('success', 'User deleted.');
    }
}
