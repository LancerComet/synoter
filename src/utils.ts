import * as fs from 'fs'
import { isError } from 'util';

/**
 * Check Whether a file exists in async.
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
function fileExistAsync (filePath: string): Promise<IAsyncResult<boolean>> {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, isExist => {
      resolve({
        data: isExist,
        error: null
      })
    })
  })
}

/**
 * Read file in async.
 *
 * @param {any} filePath
 * @returns {Promise<IAsyncResult<string>>}
 */
function readFileAsync (filePath): Promise<IAsyncResult<string>> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {
      encoding: 'utf-8'
    }, (error, data) => {
      if (error) {
        return reject({
          data: '',
          error
        })
      }

      resolve({
        data,
        error: null
      })
    })
  })
}

export {
  fileExistAsync,
  readFileAsync
}

interface IAsyncResult<T> {
  data: T
  error: Error
}
