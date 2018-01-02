
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
