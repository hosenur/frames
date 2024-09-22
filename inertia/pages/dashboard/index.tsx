import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import ImageGallery from '~/components/dashboard/image-gallery'
import ImageInfo from '~/components/dashboard/image-info'
import { Button } from '~/components/ui/button'
import { FileTrigger } from '~/components/ui/file-trigger'
import { Form } from '~/components/ui/form'
import { Modal } from '~/components/ui/modal'
import AppLayout from '~/layouts/AppLayout'
import { ImageType } from '~/types'
export default function Home(props: { images: ImageType[], baseURL: string }) {

  const { data, setData, post, progress } = useForm<{ images: FileList | null }>({
    images: null,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/images/upload')
    setModalOpen(false)
    setData('images', null)
  }
  return (
    <AppLayout>
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Button>Upload Images</Button>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Upload Images</Modal.Title>
            <Modal.Description>
              Select .png / .jpg or .jpeg files to upload
            </Modal.Description>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <div className='flex items-center justify-between'>

              <FileTrigger
                allowsMultiple={true}
                acceptedFileTypes={['image/*']}
                onSelect={(e: FileList | null) => {
                  if (!e) return
                  setData('images', e)
                }}
              />
              <p>
                {data.images && data.images.length > 0 && <span>{data.images.length} images selected</span>}
              </p>
            </div>

            <Modal.Footer>
              <Modal.Close
                onPress={() => {
                  setData('images', null)
                  setModalOpen(false)

                }}
              >Cancel</Modal.Close>
              <Button type="submit">Upload</Button>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
      <Head title="Homepage" />

      <div className='w-full flex my-4 gap-8'>

        <ImageGallery baseURL={props.baseURL} images={props.images} selectedImage={null} setSelectedImage={setSelectedImage} />
        <ImageInfo baseURL={props.baseURL} image={selectedImage} />
      </div>
    </AppLayout>
  )
}