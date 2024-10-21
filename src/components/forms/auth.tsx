import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {useState} from "react";
import {customToast} from "../../lib/utils.tsx";
import {usePartnerLogin} from "@/hooks/usePartner.ts";

const AuthForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const partnerLoginMutation = usePartnerLogin()

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!username) {
            return customToast("ERROR", "Username kiriting!")
        }

        if (!password) {
            return customToast("ERROR", "Password kiriting!")
        }

        partnerLoginMutation.mutate({username, password})
    }

    return (
        <div className={"flex flex-col gap-5 w-2/5 max-lg:w-2/3"}>
            <h1 className={"font-semibold text-center text-2xl"}>Log In</h1>

            <form onSubmit={onSubmit} className={"grid grid-cols-1 gap-2 w-full text-sm"}>
                <Input
                    placeholder={"username"}
                    className={"py-[5px]"}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    placeholder={"password"}
                    type={"password"}
                    className={"py-[5px]"}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button disabled={partnerLoginMutation.isLoading}>Login</Button>
            </form>
        </div>
    );
};

export default AuthForm;