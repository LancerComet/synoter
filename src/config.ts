/**
 * Define which volume is used for storing NoteStation.
 *
 * @type {string}
 */
export const VOLUME_NAME = 'volume1'

/**
 * fts.db is a sqlite 3 file located in this path.
 * This file is designed to store "full text searching" tokens and be a caching system.
 *
 * We'll search everything we need in this database at first,
 * and get our result
 *
 * @type {string}
 */
export const FTS_DB_PATH = `/${VOLUME_NAME}/@appstore/NoteStation/db/fts.db`

/**
 * Folder that contains note data.
 *
 * @type {string}
 */
export const NOTE_CONTENT_PATH = `/${VOLUME_NAME}/@SynoDrive/NoteStation`

/**
 * App will find all notes with this tag.
 * Default value is 'blog'.
 *
 * @type {string}
 */
export const FIND_NOTE_WITH_THIS_TAG = 'blog'
