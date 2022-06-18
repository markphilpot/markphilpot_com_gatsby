---
category: notes
title: Apple Shortcuts - graphql
tags: [digitalGarden]
date: 2022-04-08 13:40:13
modified: 2022-04-08 19:04:41
slug: 49AB389E-0619-4135-BA0D-7D099D207F63-49812-0000014C509D3802
---

# Apple Shortcuts - graphql
#digitalGarden

```
query ($search: String, $perPage: Int = 3) {
  anime: Page(perPage: $perPage) {
    pageInfo {
      total
    }
    results: media(type: ANIME, search: $search) {
      id
      title {
        userPreferred
      }
      coverImage {
        medium
      }
      type
      format
      bannerImage
      isLicensed
      startDate {
        year
      }
    }
  }
  manga: Page(perPage: $perPage) {
    pageInfo {
      total
    }
    results: media(type: MANGA, search: $search) {
      id
      title {
        userPreferred
      }
      coverImage {
        medium
      }
      type
      format
      bannerImage
      isLicensed
      startDate {
        year
      }
    }
  }
  characters: Page(perPage: $perPage) {
    pageInfo {
      total
    }
    results: characters(search: $search) {
      id
      name {
        userPreferred
      }
      image {
        medium
      }
    }
  }
  staff: Page(perPage: $perPage) {
    pageInfo {
      total
    }
    results: staff(search: $search) {
      id
      primaryOccupations
      name {
        userPreferred
      }
      image {
        medium
      }
    }
  }
  studios: Page(perPage: $perPage) {
    pageInfo {
      total
    }
    results: studios(search: $search) {
      id
      name
    }
  }
}
```


何 -- kanji for "what"