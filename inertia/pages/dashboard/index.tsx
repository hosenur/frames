import { Head, useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { FileTrigger } from '~/components/ui/file-trigger'
import { Form } from '~/components/ui/form'
import AppLayout from '~/layouts/AppLayout'

export default function Home(props: { version: number }) {

  const { data, setData, post, progress } = useForm<{ image: File | null }>({
    image: null,
  })
  console.log(props)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(data)
    post('/images/upload')
  }
  return (
    <AppLayout>
      <Head title="Homepage" />
      <div>
        <Form onSubmit={handleSubmit}>
          <FileTrigger
            allowsMultiple={false}
            onSelect={(e:FileList) => {
              setData('image', e[0])
            }}
          />
          <Button type="submit">Upload</Button>
        </Form>
      </div>
      <div>
        {props.images.map((image) => (
          <img src={`http://localhost:3333/images/_/${image.name}`} alt={image.name} />
        ))}
      </div>
    </AppLayout>
  )
}