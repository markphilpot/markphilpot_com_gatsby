---
title: 'Anime {{ __season }} {{ year }} First Impressions'
date: '{{ timestamp }}'
tags: [anime, first impressions]
category: anime
slug: anime-{{ year }}-{{ season }}-first
summary: First Impressions of the Anime {{ __season}} {{ year }} Season
hero:
featuredImage:
---

{{#each shows}}

### [{{ title.romaji }} ({{ title.english }})]({{ siteUrl }})

![{{ title.userPreferred }}](assets/{{ coverFile }})

> {{ __description }}

{{/each}}
