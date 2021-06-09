import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>('');

    let activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    let activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    };
    let activateViewModeOnKeyPress = (e: any) => {
          if(e.charCode === 13) {
              activateViewMode();
          }
    }
    let changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);

    };


    return editMode
        ? <input onBlur={activateViewMode}
                 autoFocus
                 onKeyPress={activateViewModeOnKeyPress}
                 onChange={changeInputValue}
                 value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}