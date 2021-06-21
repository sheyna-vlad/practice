import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {
    const [title, setTitle] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: any) => {
        if (error !== null) {
            setError(null);

        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    let addItem = () => {
        if (title && title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required')
        }

    }


    return <div>
        <TextField
            variant="outlined"
            onChange={onChangeTaskTitle}
            label="Filled"
            onKeyPress={onKeyPressHandler}
            value={title}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addItem} color={"primary"}>
            <AddCircleOutlineIcon/>
        </IconButton>
    </div>


});