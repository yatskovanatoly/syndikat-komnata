import AWS from 'aws-sdk'
import { S3 } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const ACCESS_ID = process.env.YANDEX_CLOUD_ACCESS_ID
const SECRET = process.env.YANDEX_CLOUD_SECRET

export async function GET() {
  if (!ACCESS_ID || !SECRET) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 })
  }

  try {
    const s3 = new S3({
      endpoint: 'https://storage.yandexcloud.net',
      region: 'ru-central1',

      // The key s3ForcePathStyle is renamed to forcePathStyle.
      forcePathStyle: true,

      credentials: new AWS.Credentials(ACCESS_ID, SECRET),
    })

    const response = await s3.listObjectsV2({
      Bucket: 'syndikat',
    })

    return NextResponse.json(response.Contents ?? [])
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to list objects' },
      { status: 500 }
    )
  }
}
