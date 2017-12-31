import * as fs from 'fs'
import { promisify } from 'util'

const fsExistAsync = promisify(fs.exists)
const fsReadFileAsync = promisify(fs.readFile)

/**
 * Check Whether a file exists in async.
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
async function fileExistAsync (filePath: string): Promise<IAsyncResult<boolean>> {
  try {
    const result = await fsExistAsync(filePath)
    return {
      data: result,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}

/**
 * Read file in async.
 *
 * @param {any} filePath
 * @returns {Promise<IAsyncResult<string>>}
 */
async function readFileAsync (filePath): Promise<IAsyncResult<string>> {
  try {
    const content = await fsReadFileAsync(filePath, {
      encoding: 'utf-8'
    })
    return {
      data: content,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}

export {
  fileExistAsync,
  readFileAsync
}

interface IAsyncResult<T> {
  data: T
  error: Error
}
