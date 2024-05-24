import { Button, Flex, Input, Space, Spin, UploadProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAddUserMutation, useEditUserMutation } from "../../jsonServerApi";
import { useContext, useEffect, useState } from "react";
import { defaultNewUserData } from "../../constants";
import { Context } from "../../contextProvider";
import { NewUser } from "../../types";

export const AddUser = () => {
    const { usersList, setUsersList } = useContext(Context);
    const { state } = useLocation();

    const [stateUserData, setStateUserData] = useState(state?.user ?? defaultNewUserData);

    const [ addUser, {data: addedUserData, isLoading: isAddUserLoading, isSuccess: isAddUserSuccess } ] = useAddUserMutation();

    const [ editUser, {data: editedUserData, isLoading: isEditUserLoading, isSuccess: isEditUserSuccess} ] = useEditUserMutation();

    const onFirstNameChange = (value: string) => {
        setStateUserData({...stateUserData, first_name: value});
    };

    const onLastNameChange = (value: string) => {
        setStateUserData({...stateUserData, last_name: value});
    };

    const onEmailChange = (value: string) => {
        setStateUserData({...stateUserData, email: value});
    };

    const onAddEditUser = () => {
        state?.edit ? editUser(stateUserData) : addUser(stateUserData);
    };

    useEffect(() => {
        if(isAddUserSuccess) setUsersList([addedUserData, ...usersList]);
        if(isEditUserSuccess) {
            setUsersList(usersList.map((user: NewUser) => user.id === editedUserData.id ? editedUserData : user));
        };
    }, [addedUserData, editedUserData, isAddUserSuccess, isEditUserSuccess]);

    return (
        <Flex vertical align="center">
            <Spin tip="Processing..." size="large" spinning={false}>
                <Space direction="vertical" size="large" style={{ margin: '30px' }}>
                    <Space.Compact>
                        <Input disabled style={{ width: '30%' }} defaultValue="First name"/>
                        <Input style={{ width: '70%' }} defaultValue={state?.user ? state?.user.first_name : defaultNewUserData.first_name} onChange={(e) => onFirstNameChange(e.target.value)}/>
                    </Space.Compact>

                    <Space.Compact>
                        <Input disabled style={{ width: '30%' }} defaultValue="Last name" />
                        <Input style={{ width: '70%' }} defaultValue={state?.user ? state?.user.last_name : defaultNewUserData.last_name} onChange={(e) => onLastNameChange(e.target.value)}/>
                    </Space.Compact>

                    <Space.Compact>
                        <Input disabled style={{ width: '30%' }} defaultValue="Email" />
                        <Input style={{ width: '70%' }} defaultValue={state?.user ? state?.user.email : defaultNewUserData.email} onChange={(e) => onEmailChange(e.target.value)}/>
                    </Space.Compact>

                </Space>
            
            <Flex justify='space-around'>
                <Button type="primary" size="large" disabled={isAddUserLoading || isEditUserLoading}><Link to="/list">На главную</Link></Button>
                <Button type="primary" size="large" onClick={onAddEditUser}>{`${state?.edit ? 'Изменить' : 'Добавить' }`}</Button>
            </Flex>
        </Spin>
    </Flex>  
)
}
