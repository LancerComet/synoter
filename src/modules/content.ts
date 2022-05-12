import { fileExist, readFileAsync } from '../utils'

// This is the file that holds the note content.
const CONTENT_FILE_NAME = 'Y29{117}{100}GV{117}{100}A{61}{61}'

// This is the file that holds brief info.
// const BRIEF_FILE_NAME = 'Y{110}J{112}ZWY{61}'

/**
 * Get note content by object id.
 *
 * @param {string} objectID
 * @return {Promise<string>}
 */
async function getNoteContentByID (objectID: string, volumeName: string): Promise<string> {
  /*
   * Folder that contains note data.
   */
  const NOTE_CONTENT_PATH = `/${volumeName}/@SynoDrive/NoteStation`

  const folderPath = `${NOTE_CONTENT_PATH}/${objectID}/version/text`

  const isFolderExist = fileExist(folderPath)
  if (!isFolderExist) {
    throw new Error(`No matched file found for "${objectID}".`)
  }

  // Folder exists, read note content.
  const noteFilePath = `${folderPath}/${CONTENT_FILE_NAME}`
  const noteContent = await readFileAsync(noteFilePath)
  return noteContent
}

export {
  getNoteContentByID
}
