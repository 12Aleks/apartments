"use client"

import {Button, ButtonProps} from "@nextui-org/react";
import {useFormStatus} from "react-dom"

const SubmitButton = (props: ButtonProps) => {
    const {pending} = useFormStatus()
    return (
        <Button {...props} disabled={pending} isLoading={pending} onClick={props.onClick}>
              Delete
        </Button>
    );
};

export default SubmitButton;