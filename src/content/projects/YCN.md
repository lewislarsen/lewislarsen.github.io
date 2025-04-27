---
title: YCN - YouTube Channel Notifier  
description: A small tool for notifying of YouTube uploads.  
date: Apr 26, 2025  
repoURL: https://github.com/lewislarsen/youtube-channel-notifier  
launchYear: 2025  
thumbnailURL: ycn.png  
activelyBeingDeveloped: true
displayGitHubBlock: true
---

### Motivation

In early 2024, I deleted my Google account. I was on a privacy kick and didn’t want to have accounts with certain companies anymore—Google being one of them. Like most people, I still watch YouTube and there are a few creators I want to keep up with.

At first, I tried bookmarking their channels and checking them manually every so often. That worked for a while, but it quickly became tedious. There had to be a better way.

That’s where this little project comes in. It uses the RSS feed data that every YouTube channel provides and compares it to what it has on record. If there’s new content (a new video), it sends a notification to let you know. I’ve had this tool running for a few months now, and it’s been working flawlessly.

### Technologies

YCN is built with Laravel and is primarily managed through the command-line interface.

### Docker

I haven’t used Docker in a long time, but this project felt like the perfect opportunity to wrap it in a container. It makes the app easy to run and more accessible to anyone who stumbles upon it and wants to give it a try.
