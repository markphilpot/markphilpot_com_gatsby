// Javascript export of Bear.app as markdown
// Inspired by https://github.com/sbusso/Bear-Markdown-Export/blob/master/bear_export_sync.py
// https://github.com/andymatuschak/Bear-Markdown-Export/blob/master/bear_export_sync.py
const os = require('os');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const rimraf = require('rimraf');
const { DateTime } = require('luxon');

// Config
// TODO read from args

// Exports to folders using first tag only, if `multi_tag_folders = False`
const makeTagFolders = true;
// Copies notes to all 'tag-paths' found in note!
// Only active if `make_tag_folders = True`
const multiTagFolders = true;

// Tag Whitelist
const onlyExportTheseTags = ['digitalGarden'];
// Tag Blacklist
const noExportTags = [];

const HOME = os.homedir();

const bearDb = path.join(
  HOME,
  'Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite'
);
const bearImagePath = path.join(
  HOME,
  'Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/Local Files/Note Images'
);

const targetDirectory = path.join(HOME, 'projects/markphilpot_com_gatsby/content/notes');

const db = new sqlite3.Database(bearDb, sqlite3.OPEN_READONLY);

const cleanTitle = title => {
  let workingTitle = title.substr(0, 256).trim();
  if (!workingTitle) {
    workingTitle = 'untitled';
  }
  workingTitle = workingTitle.replace(/[/\\*?$@!^&\|~:\.]/g, '-');
  workingTitle = workingTitle.replace(/-$/, '');
  return workingTitle.trim();
};

const tagPattern1 = new RegExp(/(?<!\S)\#([.\w\/\-<>]+)[ \n]?(?!([\/ \w]+\w[#]))/g);
const tagPattern2 = new RegExp(/(?<![\S])\#([^ \d][.\w\/ ]+?)\#([ \n]|$)/g);

const extractTags = mdText => {
  return [
    ...Array.from(mdText.matchAll(tagPattern1), m => m[1]),
    ...Array.from(mdText.matchAll(tagPattern2), m => m[1]),
  ];
};

const processImageLinks = mdText => {
  const sourceImages = Array.from(mdText.matchAll(/\[image:(.+?)\]/g), m => m[1]);
  const targetImages = sourceImages.map(i => i.replace(/ /g, '_'));

  const md = mdText.replace(/\[image:(.+?)\]/g, (match, p1) => `![Bear Image](${p1.replace(/ /g, '_')})`);
  return {
    md,
    sourceImages,
    targetImages,
  };
};

const dtConv = num => {
  const hour = 3600; // seconds
  const year = 365.25 * 24 * hour;
  const offset = year * 31 + hour * 6;
  return num + offset;
};

const exportNotes = () => {
  rimraf.sync(targetDirectory);

  // TODO join with the tags table... that way we don't have to extract tags from the markdown
  db.each("SELECT * FROM `ZSFNOTE` WHERE `ZTRASHED` LIKE '0' AND `ZARCHIVED` LIKE '0'", (err, row) => {
    const id = row['Z_PK'];
    const title = row['ZTITLE'];
    let mdText = row['ZTEXT'].trim(); // rtrim?
    const creationDate = DateTime.fromSeconds(dtConv(row['ZCREATIONDATE']));
    const modifiedDate = DateTime.fromSeconds(dtConv(row['ZMODIFICATIONDATE']));
    const uuid = row['ZUNIQUEIDENTIFIER'];

    const filename = cleanTitle(title);

    // const tags = extractTags(mdText);

    db.all(
      'SELECT * FROM ZSFNOTETAG tag, Z_7TAGS tags where tags.Z_7NOTES = ? and tag.Z_PK = tags.Z_14TAGS',
      [id],
      (err2, tagRows) => {
        const tags = tagRows.map(r => r['ZTITLE']);

        const includeRow = onlyExportTheseTags.filter(x => tags.includes(x)).length > 0;

        if (includeRow) {
          const { md, sourceImages, targetImages } = processImageLinks(mdText);

          sourceImages.forEach((sourceImage, index) => {
            const source = path.join(bearImagePath, sourceImage);
            const target = path.join(targetDirectory, uuid, targetImages[index]);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.copyFileSync(source, target);
          });

          fs.mkdirSync(path.join(targetDirectory, uuid), { recursive: true });

          const frontmatter = `---
category: notes
title: ${title}
tags: [${tags.join(', ')}]
date: ${creationDate.toFormat('yyyy-LL-dd HH:mm:ss')}
modified: ${modifiedDate.toFormat('yyyy-LL-dd HH:mm:ss')}
slug: ${uuid}
---
`;

          fs.writeFileSync(path.join(targetDirectory, uuid, 'index.md'), `${frontmatter}\n${md}`);
        }
      }
    );
  });
};

exportNotes();
