---
title: 'Anime {{ __season }} {{ year }} First Impressions'
date: '{{ timestamp }}'
tags: [anime, first impressions]
category: anime
slug: anime_{{ year }}_{{ season }}_first
summary: First Impressions of the Anime {{ __season}} {{ year }} Season
hero:
featured_image:
status: draft
---

{{#each shows}}

### [{{ title.romaji }} ({{ title.english }})]({{ siteUrl }})

![{{ title.userPreferred }}](covers/{{ coverFile }})

> {{ __description }}

{{/each}}
