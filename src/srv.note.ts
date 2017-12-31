import * as sqlite from 'sqlite'

import { FIND_NOTE_WITH_THIS_TAG, FTS_DB_PATH } from './config'
import { fileExistAsync } from './utils'

/**
 * Find all notes with target tag.
 *
 * @param {string} [tag=FIND_NOTE_WITH_THIS_TAG]
 * @return {Promise<INoteDataFromFtsDB[]>}
 */
async function findAllNotesWithTag (tag: string = FIND_NOTE_WITH_THIS_TAG): Promise<INoteDataFromFtsDB[]> {
  try {
    const { data: isFTSFileExist, error } = await fileExistAsync(FTS_DB_PATH)

    if (error) {
      throw error
    }

    if (!isFTSFileExist) {
      throw new Error(`File "${FTS_DB_PATH}" doesn't exist.`)
    }

    // Querying command.
    // In postgres:
    // select * from note where exists (select 1 from json_array_elements(tag) as tags where tags::text ='"Blog"');
    const query = `select * from notestation_content where c5tag like '%${tag}%'`

    try {
      const db = await sqlite.open(FTS_DB_PATH)
      const allNotesData = await db.all(query)

      return <INoteDataFromFtsDB[]> allNotesData
    } catch (error) {
      throw error
    }
  } catch (error) {
    console.error('[Error] Error in "findAllNotesWithTag":', error)
    return []
  }
}

export {
  findAllNotesWithTag
}

/**
 * Note Data from fts.db.
 *
 * @interface INoteDataFromFTSDB
 */
interface INoteDataFromFtsDB {
  docid: number
  c0object_id: string
  c1ver: string
  c2parent_id: string
  c3owner: string
  c4source_url: string
  c5tag: string[]
  c6fts_token: string
  c7latitude: TNumberString
  c8longitude: TNumberString
  c9location: string
  c10title: string
  c11files: string
  c12brief: string
  c13thumb: string
  c14encrypt: 'true' | 'false'
  c15ctime: TTimestampInSec
  c16mtime: TTimestampInSec
}

/**
 * Number in string.
 *
 * @example '10'
 */
type TNumberString = string

/**
 * TimeStamp in second, ts / 1000.
 *
 * @example 1486631739
 */
type TTimestampInSec = number
