import styled from "styled-components";

import { useState } from "react";
import { TextField } from "../../../components/common/TextField";
import { Button } from "../../../components/common/Button";

interface TodoInputProps {
    onSubmit: (todo: string) => void;
}

export const TodoInput = ({ onSubmit }: TodoInputProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth={true}
                    placeholder="할 일을 입력해주세요"
                />
            </div>
            <div className="button-wrapper">
                <Button
                    type="submit"
                    variant="slate-filled"
                    size="sm"
                >
                    등록
                </Button>
            </div>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    gap: 8px;
    align-items: center;

    .input-wrapper {
        flex: 1;
    }

    .button-wrapper {
        flex-shrink: 0;
    }
`; 