import {Meta, StoryObj} from "@storybook/react";
import {PasswordInput, PasswordInputProps} from "./password-input";

const meta: Meta<PasswordInputProps> = {
    title: "Molecules/PasswordInput",
    component: PasswordInput,
    argTypes: {
        disabled: {
            type: "boolean",
            description: "If the input is disabled"
        },
        className: {
            type: "string",
            description: "The input's class"
        },
    }
}

export default meta

export const Default: StoryObj<PasswordInputProps> = {
    args: {
        placeholder: "Password",
    }
}

export const Disabled: StoryObj<PasswordInputProps> = {
    args: {
        placeholder: "Password",
        disabled: true
    }
}