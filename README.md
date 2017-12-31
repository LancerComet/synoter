# Synote Bloger

`Synote Bloger` is designed to get data from `Synology NoteStation` and then use them as a blog.

## How it works?

`Synology NoteStation` is an official note-taking app for NAS system `DSM`. But unfortunately, unlinke other apps such as `AudioStaion` or `FileStation`, there is no official api for further development, so you can't customize your NoteStation for your own purpose.

After some rearch, I have found something useful:

1. NoteStation stores notes (only meta info here, no note content) to `PostgreSQL` (in DSM) for indexing.

2. Then NoteStation adds some fts (full text searching) tokens to these indexing data and copies them to a single `sqlite3` file that is stored in `/<volume_name>/@appstore/NoteStation/db/fts.db`.

3. The real stuffs are stored in `/<volume_name>/@SynoDrive/NoteStation`. Each folder holds a note, and the name of folder is the `object_id` in PostgreSQL.

So the only thing we need to do is:

1. Find out all notes that are tagged with "blog" or something else from `fts.db` and get their `object_id`.

2. Read notes from `/<volume_name>/@SynoDrive/NoteStation/<object_id>`.

And now we've got everything we need.
