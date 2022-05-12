// Import babel stuffs if you are using Node v4.
// import 'babel-register'
// import 'babel-polyfill'

import { getAllNotesWithTag } from '../src'

main()

async function main () {
  try {
    const notesData = await getAllNotesWithTag('Blog', 'volume1')
    console.log(notesData)
  } catch (error) {
    console.error('Something went wrong:', error)
  }
}
