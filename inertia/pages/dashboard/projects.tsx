import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Modal } from '~/components/ui/modal'
import { TextField } from '~/components/ui/text-field'

export default function Projects() {
    const { data, setData, post, processing } = useForm({
        name: ''
    })
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post('/projects')
    }
    return (
        <div>
            <Modal>
                <Button>Create Project</Button>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Let's create a project</Modal.Title>
                        <Modal.Description>You can upload images to your project</Modal.Description>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <TextField
                                onChange={(e) => {
                                    setData('name', e)
                                }}
                                value={data.name}
                                label="Project Name" placeholder="Enter your project name" />

                        </Modal.Body>
                        <Modal.Footer>
                            <Modal.Close>Cancel</Modal.Close>
                            <Button>Create</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}
