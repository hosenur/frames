import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { FileTrigger } from '~/components/ui/file-trigger'
import { Form } from '~/components/ui/form'
import AppLayout from '~/layouts/AppLayout'
import { ImageType } from '~/types'
import { getDomain } from '../../../lib/utils'
export default function Home(props: { images: ImageType[] }) {

  const { data, setData, post, progress } = useForm<{ images: FileList | null }>({
    images: null,
  })
  const [selectedImage, setSelectedImage] = useState()
  console.log(props)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/images/upload')
  }
  return (
    <AppLayout>
      <Head title="Homepage" />
      <div>
        <Form onSubmit={handleSubmit}>
          <FileTrigger
            allowsMultiple={true}
            acceptedFileTypes={['image/*']}
            onSelect={(e: FileList | null) => {
              if (!e) return
              setData('images', e)
            }}
          />
          <Button type="submit">Upload</Button>
        </Form>
      </div>
      <div className='flex flex-wrap gap-4'>
        {props.images.map((image) => (
          <Card key={image.id}>

            <img src={`${getDomain()}/images/w_240/${image.name}`} className='w-60 object-cover' alt={image.name} />
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}