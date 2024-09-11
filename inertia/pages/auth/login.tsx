import { router } from "@inertiajs/react";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { TextField } from "~/components/ui/text-field";


export default function Login({ props }: { props: any }) {
    console.log(props)
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.post('/login', values)
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Form onSubmit={handleSubmit}>

                <Card className="max-w-md mx-auto">
                    <Card.Header>
                        <Card.Title>Login</Card.Title>
                        <Card.Description>Don't loose the level, just keep on going.</Card.Description>
                    </Card.Header>
                    <Card.Content className="space-y-6">
                        <TextField
                            value={values.email}
                            onChange={(e) => {
                                setValues({ ...values, email: e })
                            }}
                            isRequired label="Email" placeholder="Enter your email" />
                        <TextField
                            value={values.password}
                            onChange={(e) => {
                                setValues({ ...values, password: e })
                            }}
                            isRequired label="Password" type="password" placeholder="Enter your password" />
                    </Card.Content>
                    <Card.Footer>
                        <Button type="submit" className="w-full">Login</Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}
