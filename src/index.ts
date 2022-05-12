import { getNoteContentByID } from './modules/content'
import { findAllNotesWithTag } from './modules/note'
import { INoteDataFromFtsDB } from './types'

/**
 * Note data interface.
 *
 * @interface INoteContentResult
 * @extends {INoteDataFromFtsDB}
 */
 interface INoteData extends INoteDataFromFtsDB {
  content: string
}

/**
 * Get all notes with targeted tag.
 *
 * @param {string} tag Find note with this tag.
 * @param {string} volumeName Which volume is used for storing NoteStation.
 *
 * @example
 * const blogs = await getAllNotesWithTag('blog', 'volume1')
 *
 * @returns {Promise<INoteData[]>}
 */
async function getAllNotesWithTag (tag: string, volumeName: string): Promise<INoteData[]> {
  const notesData: INoteData[] = []
  const noteIndexs = await findAllNotesWithTag(tag, volumeName)
  for (let i = 0, length = noteIndexs.length; i < length; i++) {
    const noteIndex = noteIndexs[i]
    const noteContent = await getNoteContentByID(noteIndex.c0object_id, volumeName)
    notesData.push(Object.assign({}, noteIndex, {
      content: noteContent
    }))
  }
  return notesData
}

export {
  getAllNotesWithTag
}
