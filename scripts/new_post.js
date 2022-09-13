const fs = require('fs');
const { DateTime } = require('luxon');
const { path } = require('ramda');

const isMicro = process.argv[2] === 'micro'; // post, micro
const title = process.argv[2];

const now = DateTime.local();

const dir = `./content/${isMicro ? 'micro' : 'blog'}/2022/${isMicro ? now.toFormat('yyyyLLdd-HHmmss') : title}`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  throw 'That post already exists!';
}

fs.writeFileSync(
  `${dir}/index.md`,
  `---
category: ${isMicro ? 'micro' : 'blog'}
title: ${isMicro ? '""' : title}
${isMicro ? 'path: used_for_slug' : ''}
${!isMicro ? 'tags: []' : ''}
${!isMicro ? 'summary: ' : ''}
date: ${now.toFormat('yyyy-LL-dd HH:mm:ss')}
slug: ${isMicro ? now.toFormat('yyyyLLdd-HHmmss') : title}
hero: 
featuredImage: 
---`,
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`${title} was created!`);
  }
);
