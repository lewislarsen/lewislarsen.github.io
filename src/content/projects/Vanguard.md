---
title: Vanguard
description: An open-source backup tool built with Laravel.
date: Apr 26, 2025
repoURL: https://github.com/vanguardbackup/vanguard
websiteURL: https://vanguardbackup.com
docsURL: https://docs.vanguardbackup.com
launchYear: 2024
thumbnailURL: vanguard.png
activelyBeingDeveloped: true
---

### Backstory 
Vanguard's development first started in mid 2024 out of the need to have a backup solution that was flexible, reliable and free. One of the core ethos when putting Vanguard together was that it should be open source, and it still [is](https://github.com/vanguardbackup/vanguard).

The initial development of Vanguard took a couple of weeks, putting together a prototype which initially only supported file backups, and it had a lot of pains initially and was pretty unreliable. But one day the backup worked, and from there it slowly grew.

### Progress

Over time, development continued and features were added such as database backups, streaming and the API which I'm fairly pleased with. The project has grown to have over 700 commits and while commits aren't being added daily, I do often have features in mind that I'd like to implement into the project.

One of the core tenants I try to keep in mind when working on Vanguard is **tests, tests, tests**. I often feel that without tests you can't have a reliable, long term application that you can tweak and continue to work on without fear of breaking seemingly unrelated of the application. Tests, especially tests that interface with something external like an Ubuntu server can be messy, but I try to mock as best as I can.

### Mistakes along the way

One of the biggest technical mistakes I've made was in choosing the technology that Vanguard uses. If I were putting together Vanguard today, I would've gone with [InertiaJS](https://inertiajs.com/). I like Livewire, but I think it's grown a bit unwieldy with Vanguard, that may be partly my fault, but I've often had state and component sync problems which have been a pain to rectify. 

### Today and the Future

I use Vanguard every single day, I don't interact with it daily, but I do have backup tasks that run to backup Vanguard itself, and other small projects that I'm working on. Vanguard's future is looking bright and I hope in the future we'll see it grow and develop into a better application than it is currently. I'm not the world's best developer, and I've made mistakes along the way, but I'm happy with vanguard but there's always room for improvement of course.

If you want to give Vanguard's code a read, [here you go!](https://github.com/vanguardbackup/vanguard)