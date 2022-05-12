# Synoter

`Synoter` is designed for getting data from `Synology NoteStation`.

> This article describes how NoteStation works in DSM 6. For now I dont know what's going on in DSM 7, I still use DSM 6.

## How it works?

`Synology NoteStation` is an official note-taking app for Synology NAS system `DSM`. 

Unfortunately, unlinke other apps such as `AudioStaion` or `FileStation`, there is no official API of Note Station for further development, so you just can't customize your NoteStation for your own purpose.

After some rearch, I have found something useful:

1. NoteStation stores notes meta data to `PostgreSQL` (in DSM) for indexing.

2. Then NoteStation adds some FTS (full text searching) tokens to these indexing data and copies them to a single `sqlite3` file that is stored in `/<volume_name>/@appstore/NoteStation/db/fts.db`.

3. The real stuffs are stored in `/<volume_name>/@SynoDrive/NoteStation`. Each folder holds a note, and the name of folder is the `object_id` in metadata.

So if you want to take something out of the NoteStation, the only thing we need to do is:

1. Find out all notes that are tagged with "blog" (or anything you like) from `fts.db` and get their `object_id`.

2. Read notes from `/<volume_name>/@SynoDrive/NoteStation/<object_id>` by using `object_id` from above.

And now we've got everything we need.

## Something you might know.

`Synoter` is a node.js package written in Typescript, so you have to know how to deal with Node.js.

If your NAS is running node.js v4, you have to import both `babel-polyfill` and `babel-register` in your own application otherwise `sqlite` will keep throwing error.

For Node v8 and v12, everything would be fine.

## Quick Start.

1. Git clone and copy these files to your own project.

2. Rock n' roll.

```ts
// In your app.
import { getAllNotesWithTag } from './synoter/src/index'

try {
  const notesData = await getAllNotesWithTag('Blog', 'volume1')  // Get notes tagged with "Blog" from volume1. Replace "volume1" with where your NoteStation is installed on.
  console.log(notesData)  //INoteData[]. This is an array that holds all note data.
} catch (error) {
  console.error('Something went wrong:', error)
}

```

You can check example codes in `example` folder.

## License

MIT.
