import AWS from 'aws-sdk'
import { NextResponse } from 'next/server'

const ACCESS_ID = process.env.YANDEX_CLOUD_ACCESS_ID
const SECRET = process.env.YANDEX_CLOUD_SECRET

export async function GET() {
  if (!ACCESS_ID) return new Error('no access id')
  if (!SECRET) return new Error('no secret')

  try {
    const s3 = new AWS.S3({
      endpoint: 'https://storage.yandexcloud.net',
      region: 'ru-central1',
      s3ForcePathStyle: true,
      credentials: new AWS.Credentials(ACCESS_ID, SECRET),
    })

    const response = await s3
      .listObjectsV2({
        Bucket: 'syndikat',
      })
      .promise()

    console.log('Objects:', response.Contents)
    return NextResponse.json(response.Contents)
  } catch (error) {
    console.log(error)
  }
}
