---
title: "Anime {{ __season }} {{ year }} First Impressions"
date: "{{ timestamp }}"
tags: [anime, first impressions]
category: anime
slug: anime_{{ year }}_{{ season }}_first
summary: First Impressions of the Anime {{ __season}} {{ year }} Season
hero: "hero.jpg"
featured_image: "hero.jpg"
status: draft
---

{{#each shows}}

### [{{ title.userPreferred }}]({{ siteUrl }})

![{{ title.userPreferred }}](covers/{{ coverFile }})
 
![{{ __studios }}](studios/half/.png)

<div class="studio">{{ __studios }}</div>

> {{ __description }}

{{/each}}
