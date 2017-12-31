import { NOTE_CONTENT_PATH } from './config'
import { fileExistAsync, readFileAsync } from './utils'

// This is the file that holds the note content.
const CONTENT_FILE_NAME = 'Y29{117}{100}GV{117}{100}A{61}{61}'

// This is the file that holds brief info.
const BRIEF_FILE_NAME = 'Y{110}J{112}ZWY{61}'

/**
 * Get note content by object id.
 *
 * @param {string} objectID
 * @return {Promise<string>}
 */
async function getNoteContentByID (objectID: string): Promise<string> {
  const folderPath = `${NOTE_CONTENT_PATH}/${objectID}/version/text`

  try {
    const { data: isFolderExist, error } = await fileExistAsync(folderPath)

    if (error) {
      throw error
    }

    if (!isFolderExist) {
      throw new Error(`No matched file found for "${objectID}".`)
    }

    // Folder exists, read note content.
    const noteFilePath = `${folderPath}/${CONTENT_FILE_NAME}`
    const { data: noteContent, error: readNoteError } = await readFileAsync(noteFilePath)

    if (readNoteError) {
      throw readNoteError
    }

    return noteContent
  } catch (error) {
    console.error('[Error] Error occured in "getNoteContentByID":', error)
    return ''
  }
}

export {
  getNoteContentByID
}
