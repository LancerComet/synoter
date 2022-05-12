import sqlite from 'sqlite'
import { INoteDataFromFtsDB } from '../types'
import { fileExist } from '../utils'

/**
 * Find all notes with target tag.
 *
 * @param {string} tag
 * @return {Promise<INoteDataFromFtsDB[]>}
 */
async function findAllNotesWithTag (tag: string, volumeName: string): Promise<INoteDataFromFtsDB[]> {
  /*
   * fts.db is a sqlite 3 file located in this path.
   * This file is designed to store "full text searching" tokens and be a caching system.
   *
   * We'll search everything we need in this database at first,
   * and get our result
   */
  const FTS_DB_PATH = `/${volumeName}/@appstore/NoteStation/db/fts.db`
  const isFTSFileExist = fileExist(FTS_DB_PATH)

  if (!isFTSFileExist) {
    throw new Error(`File "${FTS_DB_PATH}" doesn't exist.`)
  }

  // Querying command.
  // In postgres:
  // select * from note where exists (select 1 from json_array_elements(tag) as tags where tags::text ='"Blog"');
  const query = `select * from notestation_content where c5tag like '%${tag}%'`

  const db = await sqlite.open({
    filename: FTS_DB_PATH,
    driver: sqlite.Database
  })
  const allNotesData = await db.all(query)
  return allNotesData as INoteDataFromFtsDB[]
}

export {
  findAllNotesWithTag
}
