import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Link } from "~/components/ui/link";
import { TextField } from "~/components/ui/text-field";


export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">

            <Card className="max-w-md mx-auto">
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                    <Card.Description>Don't loose the level, just keep on going.</Card.Description>
                </Card.Header>
                <Card.Content className="space-y-6">
                    <TextField isRequired label="Email" placeholder="Enter your email" />
                    <TextField isRequired label="Password" type="password" placeholder="Enter your password" />
                    <div className="flex justify-between items-center">
                        <Checkbox>Remember me</Checkbox>
                        <Link intent="primary" href="#">
                            Forgot password?
                        </Link>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button className="w-full">Login</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
