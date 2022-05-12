/**
 * Number in string.
 *
 * @example '10'
 */
 type NumberString = string

 /**
  * TimeStamp in second, ts / 1000.
  *
  * @example 1486631739
  */
 type TimestampInSec = number

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
   c7latitude: NumberString
   c8longitude: NumberString
   c9location: string
   c10title: string
   c11files: string
   c12brief: string
   c13thumb: string
   c14encrypt: 'true' | 'false'
   c15ctime: TimestampInSec
   c16mtime: TimestampInSec
 }

export {
  NumberString as TNumberString,
  TimestampInSec as TTimestampInSec,
  INoteDataFromFtsDB
}
