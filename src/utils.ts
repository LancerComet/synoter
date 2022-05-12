import * as fs from 'fs'

/**
 * Check Whether a file exists in async.
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
function fileExist (filePath: string): boolean {
  return fs.existsSync(filePath)
}

/**
 * Read file in async.
 *
 * @param {any} filePath
 * @returns {Promise<IAsyncResult<string>>}
 */
function readFileAsync (filePath): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {
      encoding: 'utf-8'
    }, (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

export {
  fileExist,
  readFileAsync
}
