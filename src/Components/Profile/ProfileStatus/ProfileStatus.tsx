import {ChangeEvent,FC, useEffect, useState} from "react";

type PropsType = {
    profileStatus: string
    updateStatus:(newStatus:string) => void
    editMode: boolean
    status: string
}

const ProfileStatus:FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)

    const [status, setStatus] = useState(props.profileStatus)

    useEffect(() => {
        setStatus(props.profileStatus)
    }, [props.profileStatus]);

    const statusMode = (mode:boolean) => {
        setEditMode(mode)
        if (mode === false) {
            props.updateStatus(status)
        }
    }

    const setStatusProfile = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (<>

        {!editMode ?
            <div>
            <span onDoubleClick={() => {
                statusMode(true)
            }}><b>Мой статус:</b> {props.profileStatus ? props.profileStatus : 'Статус отсутствует'}</span>
            </div> :
            <div>
                <input onChange={setStatusProfile} autoFocus={true} onBlur={() => {
                    statusMode(false)
                }} value={status} type="text"/>
            </div>
        }


    </>)
}

export default ProfileStatus