import 'babel-register'
import 'babel-polyfill'

import { getAllNotesWithTag } from '../src'

main()

async function main () {
  const notesData = await getAllNotesWithTag('Blog')
  console.log(notesData)
}
