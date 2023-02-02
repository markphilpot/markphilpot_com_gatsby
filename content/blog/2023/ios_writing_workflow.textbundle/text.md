---
title: 'iOS Writing Workflow'
date: '2023-02-01 00:00:00'
tags: [writing]
category: software
slug: ios-writing-workflow
summary: 
hero: assets/hero.jpg
featuredImage: assets/hero.jpg
---
![](assets/hero.jpg "hidden")

This is a static blog powered by markdown files. The files live in a git repository and build process turns those markdown files into the site you are reading now. This has proved tricky to have a writing workflow that can be done completely from iOS, but as this test will hopefully prove, it can be done.

## software Used

**Ulysses** for writing. Software exists on both macOS and iOS and I already use it for writing this blog on the desktop and publish short posts via [Micro.blog](https://micro.blog)

**Working Copy** for git management. It would be nice to have a command line environment that *also* integrates with the Files app, but it’s a very good gui app.

**Netlify** for building and hosting.  Netlify has a PR process to create a preview site based on a PR branch. That way I can preview what this post will actually look like once it’s done without pushing it to the real site.

**Photoshop** for image editing. Procreate might be a better option for this, but this is mostly force of habit.

## wiring it all together 

Ulysses supports external files, so I can clone the repository in Working Copy and I can open the content directory in Ulysses. I’ve already configured my static site to build `.textbundle`files which is how Ulysses bundles markdown and images together.