import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import ImageGallery from '~/components/dashboard/image-gallery'
import ImageInfo from '~/components/dashboard/image-info'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { FileTrigger } from '~/components/ui/file-trigger'
import { Form } from '~/components/ui/form'
import AppLayout from '~/layouts/AppLayout'
import { ImageType } from '~/types'
export default function Home(props: { images: ImageType[], baseURL: string }) {

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
      {/* <div>
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
      </div> */}
      <div className='w-full flex'>

      <ImageGallery baseURL={props.baseURL} images={props.images} selectedImage={null} setSelectedImage={() => { }} />
      <ImageInfo baseURL={props.baseURL} image={props.images[0]} />
      </div>
    </AppLayout>
  )
}