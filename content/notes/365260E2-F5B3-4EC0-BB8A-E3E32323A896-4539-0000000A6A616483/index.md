---
category: notes
title: MBP 14 Notes
tags: [blog, digitalGarden]
date: 2021-11-09 22:20:34
modified: 2021-11-15 19:33:50
slug: 365260E2-F5B3-4EC0-BB8A-E3E32323A896-4539-0000000A6A616483
---

# MBP 14 Notes
#blog #digitalGarden

- Separate M1 installers for Jetbrains products
	- Still being marked as "unsupported?"
- Reminder: Virtualization != Emulation
- Java 17 upgrade required to get aarch64/aa64

[Xcode error 'building for iOS Simulator, but linking in dylib built for iOS .. for architecture arm64' from Apple Silicon M1 Mac - Stack Overflow](https://stackoverflow.com/questions/65978359/xcode-error-building-for-ios-simulator-but-linking-in-dylib-built-for-ios-f)

homebrew binaries are now in `/opt/homebrew/bin`

```
# Permanent fix
ln -s $(which node) /usr/local/bin/node
```

[feat:(mac): Apple Silicon builds (arm64)  by mmaietta · Pull Request #5426 · electron-userland/electron-builder · GitHub](https://github.com/electron-userland/electron-builder/pull/5426#issuecomment-739565640)

```
# node-gyp needs python 2 to work *sigh*
export npm_config_python=/usr/bin/python2.7
```

Many projects still not offering arm builds of native dependencies
[Please add binary for arm64 · Issue #903 · mapbox/node-sqlite3 · GitHub](https://github.com/mapbox/node-sqlite3/issues/903)