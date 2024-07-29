// import { promises as fs } from 'fs'
// import path from 'path'

// export async function GET(request: Request) {
//   const filePath = path.join(process.cwd(), 'src', 'public', 'exam', '1.txt')

//   try {
//     const fileContent = await fs.readFile(filePath, 'utf8')
//     return new Response(fileContent)
//   } catch (error) {
//     console.error('Error reading file:', error)
//     return new Response(`Error reading file: ${error.message}`, { status: 500 })
//   }
// }

import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get('examName') || '1.txt' // 默认为 '1.txt'

  const filePath = path.join(process.cwd(), 'src', 'public', 'exam', fileName)
  console.log(filePath)

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    return new Response(fileContent)
  } catch (error: any) {
    console.error('Error reading file:', error)
    return new Response(`Error reading file: ${error.message}`, { status: 500 })
  }
}
