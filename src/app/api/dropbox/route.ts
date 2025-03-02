import { NextResponse } from 'next/server'
import { Dropbox } from 'dropbox'

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN

export async function GET() {
  if (!DROPBOX_ACCESS_TOKEN) {
    console.error('🚨 Missing Dropbox Access Token in environment variables.')
    return NextResponse.json(
      { error: 'Missing Dropbox Access Token' },
      { status: 500 }
    )
  }

  try {
    const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch })
    const response = await dbx.filesListFolder({ path: '' })

    const files = await Promise.all(
      response.result.entries.map(async (file) => {
        if (file['.tag'] === 'file') {
          try {
            const tempLink = await dbx.filesGetTemporaryLink({
              path: file.path_lower!,
            })
            return { id: file.id, name: file.name, link: tempLink.result.link }
          } catch (linkError) {
            console.error('❌ Error getting temporary link:', linkError)
            return null
          }
        }
        return null
      })
    )

    return NextResponse.json(files.filter(Boolean)) // ✅ Return valid JSON response
  } catch (error) {
    console.error('🚨 Dropbox API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Dropbox files' },
      { status: 500 }
    )
  }
}
