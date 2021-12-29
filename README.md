# Synoter

`Synoter` is designed to get data from `Synology NoteStation`.

> This article describes how NoteStation works in DSM 6. For now I dont know what's going on in DSM 7, I have to look into this.

## How it works?

`Synology NoteStation` is an official note-taking app for NAS system `DSM`. But unfortunately, unlinke other apps such as `AudioStaion` or `FileStation`, there is no official api for further development, so you can't customize your NoteStation for your own purpose.

After some rearch, I have found something useful:

1. NoteStation stores notes (only meta info here, no note content) to `PostgreSQL` (in DSM) for indexing.

2. Then NoteStation adds some fts (full text searching) tokens to these indexing data and copies them to a single `sqlite3` file that is stored in `/<volume_name>/@appstore/NoteStation/db/fts.db`.

3. The real stuffs are stored in `/<volume_name>/@SynoDrive/NoteStation`. Each folder holds a note, and the name of folder is the `object_id` in PostgreSQL.

So if you want to take something out of the NoteStation, the only thing we need to do is:

1. Find out all notes that are tagged with "blog" (or anything you like) from `fts.db` and get their `object_id`.

2. Read notes from `/<volume_name>/@SynoDrive/NoteStation/<object_id>` by using `object_id` from above.

And now we've got everything we need.

## Something you might know.

`Synoter` is written in Typescript, so you should know how to code in TypeScript, or just compile them to JavaScript.

If your NAS is running node.js v4, you have to import both `babel-polyfill` and `babel-register` in your own application otherwise `sqlite` will keep throwing error.

## Quick Start.

1. Git clone and copy these files to your own project.

2. Rock n' roll.

```typescript
// In your app.

import { getAllNotesWithTag } from './synoter/src/index'

getNotesTaggedWithBlog()

async function getNotesTaggedWithBlog () {
  const notesData = await getAllNotesWithTag('Blog')
  console.log(notesData)  //INoteData[]. This is an array that holds all note data.
  // ...
}
```

You can check example codes in `test` folder.

## License

MIT.
