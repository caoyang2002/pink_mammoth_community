// pages/api/read-file.ts
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const filePath = 'public/exam/1.exam' // 相对于项目的根目录
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    response.status(200).send(fileContent)
  } catch (error) {
    console.error('Error reading file:', error)
    response.status(500).send('Error reading file')
  }
}
