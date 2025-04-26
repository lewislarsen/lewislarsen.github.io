---
title: Using the Spotify API to get Cover images with Laravel
description: Tutorial on contacting the Spotify API in a Laravel application.
date: Apr 29, 2025
tags: ["laravel", "testing", "spotify",]
---

Recently in one of my tiny side projects, I needed to contact the Spotify API and retrieve some album data for a specific artist. This was a pretty fun adventure that I went down, and I wanted to address it for posterity.

### Requirements

To start off, you'll need to have a [Spotify account](https://developer.spotify.com/dashboard) and a Spotify Developer app created to get a `Client ID` and `Client Secret`. You shouldn't need premium for this functionality; however, please let me know if you do! :)

### Configuration

Once you've got the above, we'll head to `services.php` and add a new array key:

```php
    'spotify' => [
        'client_id' => env('SPOTIFY_CLIENT_ID'),
        'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
    ],
```
With the key added, we'll need to set them in our `.env` file with the values that Spotify has given us. Once we've done that, it's on to making the Action that will do the bulk of the work.

### Creating the Action

Create an action called `RetrieveSpotifyAlbumCoverAction.php`.

```php
<?php

namespace App\Actions;

use Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RetrieveSpotifyAlbumCoverAction
{
    private const TOKEN_URL = 'https://accounts.spotify.com/api/token';
    private const BASE_URL = 'https://api.spotify.com/v1/albums/';

    public function execute(string $albumId): ?string
    {
        $clientId = Config::get('services.spotify.client_id');
        $clientSecret = Config::get('services.spotify.client_secret');

        try {
            $accessToken = $this->getAccessToken($clientId, $clientSecret);
            
            if ($accessToken === null) {
                return null;
            }

            return $this->fetchAlbumCoverUrl($albumId, $accessToken);
        } catch (Exception $e) {
            Log::error('Error retrieving Spotify album cover: ' . $e->getMessage());
            return null;
        }
    }

    private function getAccessToken(string $clientId, string $clientSecret): ?string
    {
        $tokenResponse = Http::asForm()->post(self::TOKEN_URL, [
            'grant_type' => 'client_credentials',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
        ]);

        if (!$tokenResponse->successful()) {
            Log::error('Spotify token request failed.', ['response' => $tokenResponse->body()]);
            return null;
        }

        return $tokenResponse->json()['access_token'];
    }

    private function fetchAlbumCoverUrl(string $albumId, string $accessToken): ?string
    {
        $response = Http::withToken($accessToken)->get(self::BASE_URL . $albumId);

        if (!$response->successful()) {
            Log::error('Failed to retrieve Spotify album data.', ['response' => $response->body()]);
            return null;
        }

        $data = $response->json();
        
        if (empty($data['images'])) {
            return null;
        }

        return $data['images'][0]['url'];
    }
}
```
There's a lot of code there, so I'll break it down:

1. We're contacting the Spotify API with our credentials
2. If successful, we're getting our access token
3. We're then using that token to retrieve our album cover image URL

The Spotify API requires this two-step authentication process where we exchange our client credentials for a bearer token that's valid for an hour.

If you're using the Spotify API frequently in your project, you would typically extract all of the token handling code into its own service or action. However, as we're only contacting the API for one specific piece of information, this implementation is acceptable.

### Displaying the Album Cover

Once we've done this, in a controller for example, we can do the following:

```php
$action = new RetrieveSpotifyAlbumCoverAction();
$coverUrl = $action->execute("0dt9ly05oN0neEbWnmSara");
```

This will return a URL like:

```
https://i.scdn.co/image/ab67616d0000b273a5e3dace762752d06ef8ba87
```

Or as an image:

![A cover image for In the Dark by JJ Heller](/blog/resulting-cover-image.jpg)
*(An album cover for a single by JJ Heller that I've been enjoying recently.)*

### Testing

Don't forget to test this action as well. You'll want to test both the expected result and any potential edge cases:

- What happens if Spotify is down?
- What happens if your tokens are invalid?
- What happens if the album ID is invalid?
- What if the album doesn't have any images?

Here's an example of a few feature tests for the action:

```php
<?php

use Illuminate\Support\Facades\Http;
use App\Actions\RetrieveSpotifyAlbumCoverAction;

beforeEach(function (): void {
    $this->action = new RetrieveSpotifyAlbumCoverAction();

    $this->fakeTokenResponse = [
        'access_token' => 'fake-access-token',
        'token_type' => 'Bearer',
        'expires_in' => 3600,
    ];
});

test('it retrieves the album cover image', function (): void {
    Http::fake([
        'https://accounts.spotify.com/api/token' => Http::response($this->fakeTokenResponse),
        'https://api.spotify.com/v1/albums/*' => Http::response([
            'images' => [
                ['url' => 'https://i.scdn.co/image/fakealbumcover1', 'height' => 640, 'width' => 640],
            ],
        ]),
    ]);

    $url = $this->action->execute('fakeAlbumId');

    expect($url)->toBeString()
        ->and(filter_var($url, FILTER_VALIDATE_URL))->not->toBeFalse();
});

test('it logs an error and returns null on token failure', function (): void {
    Http::fake([
        'https://accounts.spotify.com/api/token' => Http::response(['error' => 'invalid_client'], 401),
    ]);

    $result = $this->action->execute('invalidAlbumId');

    expect($result)->toBeNull();
});

test('it logs an error and returns null on album fetch failure', function (): void {
    Http::fake([
        'https://accounts.spotify.com/api/token' => Http::response($this->fakeTokenResponse),
        'https://api.spotify.com/v1/albums/*' => Http::response(['error' => 'not_found'], 404),
    ]);

    $result = $this->action->execute('nonExistentAlbum');

    expect($result)->toBeNull();
});

test('it returns null if album data has no images', function (): void {
    Http::fake([
        'https://accounts.spotify.com/api/token' => Http::response($this->fakeTokenResponse),
        'https://api.spotify.com/v1/albums/*' => Http::response(['images' => []]),
    ]);

    $url = $this->action->execute('albumWithNoImages');

    expect($url)->toBeNull();
});
```

### Finishing Up

Now that you've reached this point in the article, you have implemented an action to retrieve a Spotify album cover and created tests to ensure all potential outcomes are handled properly.

This code is working fine as of Laravel 12 but it is possible that it could break in future versions.