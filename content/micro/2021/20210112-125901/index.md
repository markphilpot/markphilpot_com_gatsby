---
category: micro
title: ""
path: used_for_slug
date: 2021-01-12 12:59:01
slug: 20210112-125901
hero: 
featured_image: 
---
Steps to write a new static micro post:

```
yarn newPost micro
# Edit index.md in Caret
yarn start # Verify
git add .
git commit -m "new micro post"
git push
```

Doesn't seem too bad for now. I think I'm going to start a new app that allows me to do all those things from a single form in the menu bar. The more I can treat the entire process as atomic, the more I think I'll use it.

Event better, generate a twitter compatible summary, add a back link and post to twitter.