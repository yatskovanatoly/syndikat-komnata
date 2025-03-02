import { Dropbox } from 'dropbox'

const DROPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN ||
  process.env.DROPBOX_ACCESS_TOKEN

export async function getDropboxFiles() {
  if (!DROPBOX_ACCESS_TOKEN) {
    console.error('🚨 Missing Dropbox Access Token in environment variables.')
    return
  }

  try {
    const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN })
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

    return files
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('🚨 Dropbox API Error:', error)
    return
  }
}
