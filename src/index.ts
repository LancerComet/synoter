/// <reference path="./index.d.ts" />

import { FIND_NOTE_WITH_THIS_TAG } from './config'
import { findAllNotesWithTag } from './srv.note'
import { getNoteContentByID } from './srv.content'

/**
 * Get all notes with targeted tag.
 *
 * @param {string} [tag=FIND_NOTE_WITH_THIS_TAG]
 * @returns {Promise<INoteData[]>}
 */
async function getAllNotesWithTag (tag: string = FIND_NOTE_WITH_THIS_TAG): Promise<INoteData[]> {
  const notesData: INoteData[] = []
  const noteIndexs = await findAllNotesWithTag(tag)
  for (let i = 0, length = noteIndexs.length; i < length; i++) {
    const noteIndex = noteIndexs[i]
    const noteContent = await getNoteContentByID(noteIndex.c0object_id)
    notesData.push(Object.assign({}, noteIndex, {
      content: noteContent
    }))
  }
  return notesData
}

export {
  getAllNotesWithTag
}

/**
 * Note data interface.
 *
 * @interface INoteContentResult
 * @extends {INoteDataFromFtsDB}
 */
interface INoteData extends INoteDataFromFtsDB {
  content: string
}
