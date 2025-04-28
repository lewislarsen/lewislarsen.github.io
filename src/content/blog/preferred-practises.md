---
title: Laravel Practices - My Personal Approach
description: My preferred approaches when crafting Laravel applications.
date: Apr 28, 2025
tags: ["laravel"]
---
Over the years, when designing a Laravel application, I've come across particular ways that I like to do things; what makes sense for me and, sometimes it aligns with the "best practises" of the Laravel developer community.
Keep in mind that you do **not** have to follow these, these are simply what I like doing and I thought it might be useful for some people.

I have some overall aims to keep in mind when working on a project, and below is a brief numbered list.

1. Always test, you need confidence in your code.
2. No custom methods in ANY Controllers. Use single-action controllers like `MarkPostAsReadController.php`.
3. Policies for CRUD, Gates for custom actions (like post etc)
4. Handle date formatting in models, not JS views
5. Resources for crafting API responses
6. Minor database column updates should be in the model `$post->markAsRead();`

## Facades over Helper Functions
As with most ways in Laravel, there are **many** ways to do the same thing.

```php
<?php
// Helper function approach
$userName = auth()->user()->name;
$value = session('key');
$path = storage_path('app/file.txt');
```

to this:
```php
<?php
// Facade approach
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

$userName = Auth::user()->name;
$value = Session::get('key');
$path = Storage::path('file.txt');
```

I personally prefer using facades as I think it makes for nicer looking code, at the cost of requiring an import.

## Early Returns
Early returns are a favourite of mine to implement, they drastically help improve the readability of code and allow you to avoid deeply nested if statements before a specific condition is met.

```php
<?php
// Before: Nested approach
public function process($user)
{
    if ($user->isAdministrator()) {
        if ($user->isStaffMember()) {
            if ($user->hasPermission('edit')) {
                // Do something important
                return true;
            }
        }
    }
    return false;
}
```

To something cleaner like this:

```php
<?php
// After: Early returns approach
public function process($user)
{
    if (!$user->isAdministrator()) {
        return false;
    }
    
    if (!$user->isStaffMember()) {
        return false;
    }
    
    if (!$user->hasPermission('edit')) {
        return false;
    }
    
    // Do something important
    return true;
}
```

## Avoiding the classic if/else trap

Another pattern I frequently see is the overuse of if/else statements when there are cleaner alternatives:

```php
// Before
public function getUserType($user)
{
    if ($user->isAdmin()) {
        return 'admin';
    } else {
        return 'regular';
    }
}

// After
public function getUserType($user)
{
    return $user->isAdmin() ? 'admin' : 'regular';
}
```

## Route Model Binding

Route model binding is a powerful feature in Laravel that many developers underutilize:

```php
// Before
Route::get('/users/{id}', function ($id) {
    $user = User::findOrFail($id);
    return view('users.show', ['user' => $user]);
});

// After
Route::get('/users/{user}', function (User $user) {
    return view('users.show', ['user' => $user]);
});
```

## Comments

I have often battled with comments, the approach I have mostly settled on is small, succinct comments on class methods and the class itself and avoid commenting obvious code.

Here's an example of where I consider a comment to be redundant.
```php
<?
// This sends a notification to all subscribers of the blog.
$post->notifySubscribers();
```

## Closing Thoughts

Laravel is a rather flexible framework after all, so you don't have to use what I consider "good practise", but I like the approach I take and I think it makes my projects easier to maintain for the long-term.

This post isn't a list of everything I do, but a highlight of the approaches I take when building projects in Laravel. You should of course use things like small methods, action/service classes and keep in mind how maintainable a project is, six months, a year or five years from now. 