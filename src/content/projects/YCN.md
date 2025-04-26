---
title: YCN - YouTube Channel Notifier
description: A small tool for notifying of YouTube uploads.
date: Apr 26, 2025
repoURL: https://github.com/lewislarsen/youtube-channel-notifier
launchYear: 2025
thumbnailURL: ycn.png
activelyBeingDeveloped: true
---

### Motivation

In early 2024 I deleted my Google account, I was on a privacy kick and I didn't want to have accounts with certain companies any more, one of those companies being Google. Like most people, I watch YouTube and there are certain creators that I want to stay in the loop with. My first idea was to bookmark all the creators I follow and check them every so often, and I did it for a while.. but it felt cumbersome and there must be a better way. In comes this little project, the project uses the RSS feed data that each YouTube channel has, and compares it to the information it has on record. If there's new information (a new video), it will send a notification letting you know. I've had this little project running for a few months now, and it's worked absolutely well. 

### Technologies

YCN is built with Laravel and is primarily managed through the command-line interface.

### Docker

I haven't used Docker in a long time, but I thought this was a great opportunity to wrap this tiny project in a Docker container for easy accessibility for anybody that stumbles upon this project and wants to use it.