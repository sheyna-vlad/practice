import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    let onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let addItem = () => {
        if (title && title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required')
        }

    }
    const onKeyPressHandler = (e: any) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }


    return <div>
        <input onChange={onChangeTaskTitle}
               onKeyPress={onKeyPressHandler}
               value={title}
               className={error ? 'error' : ''}
        />
        <button onClick={addItem}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>


}