import { Button, Flex, Input, Space, Spin } from 'antd';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../context';
import { defaultItem } from '../constants';

export function AddEditPage() {
    const { state } = useLocation();

    const [item, setItem] = useState(state?.edit ? state?.item : defaultItem);

    const {itemsList, setItemsList} = useContext(Context);

    const {mutate: editItem, isLoading: isEditLoading} = useMutation(async (id) => {
        const res = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(item)
    })
        let result = await res.json();
        setItemsList(itemsList.map(item => item.id !== result.id ? item : result))
})
     
    const {mutate: addItem, isLoading: isAddLoading} = useMutation(async () => {
        const res = await fetch('https://api.restful-api.dev/objects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(item)
        });
        let result = await res.json();
        setItemsList([result, ...itemsList]);
    });

    const onFieldChange = (e, field) => setItem({...item, data: {...item.data, [field]: e.target.value}})
    
    return (
            <Flex vertical align="center">
                <Spin tip="Processing..." size="large" spinning={isAddLoading || isEditLoading}>
                    <Space direction="vertical" size="large" style={{ margin: '30px' }}>
                        <Space.Compact>
                            <Input disabled style={{ width: '20%' }} defaultValue="name"/>
                            <Input style={{ width: '80%' }} defaultValue={state?.edit ? state?.item.name : defaultItem.name} onChange={(e) => setItem({...item, name: e.target.value})}/>
                        </Space.Compact>

                        <Space.Compact>
                            <Input disabled style={{ width: '20%' }} defaultValue="year" />
                            <Input style={{ width: '80%' }} defaultValue={state?.edit ? state?.item.data.year : defaultItem.data.year} onChange={(e) => onFieldChange(e, "year")}/>
                        </Space.Compact>

                        <Space.Compact>
                            <Input disabled style={{ width: '20%' }} defaultValue="price" />
                            <Input style={{ width: '80%' }} defaultValue={state?.edit ? state?.item.data.price : defaultItem.data.price} onChange={(e) => onFieldChange(e, "price")}/>
                        </Space.Compact>
                    </Space>
                
                <Flex>
                    <Button className='addButton' type="primary" size="large"><Link to="/">На главную</Link></Button>
                    <Button className='addButton' type="primary" size="large" onClick={() => state?.edit ? editItem(state?.item.id) : addItem()}>{state?.edit ? "Изменить" : "Добавить"}</Button>
                </Flex>
            </Spin>
        </Flex>  
    )
}