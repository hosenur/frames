import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import ImageGallery from '~/components/dashboard/image-gallery'
import ImageInfo from '~/components/dashboard/image-info'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { FileTrigger } from '~/components/ui/file-trigger'
import { Form } from '~/components/ui/form'
import { Modal } from '~/components/ui/modal'
import { Sheet } from '~/components/ui/sheet'
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


      <ImageGallery baseURL={props.baseURL} images={props.images} selectedImage={null} setSelectedImage={setSelectedImage} />

      <Sheet isOpen={selectedImage != null} onOpenChange={(open) => {
        if (!open) {
          setSelectedImage(null)
        }
      }}>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Update User Settings</Sheet.Title>
            <Sheet.Description>Adjust your preferences and configurations here.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Body>
            <ImageInfo baseURL={props.baseURL} image={selectedImage} />

          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button intent="primary" type="submit">
              Save Changes
            </Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    </AppLayout>
  )
}