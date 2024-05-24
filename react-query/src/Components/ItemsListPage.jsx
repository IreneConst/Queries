import { Button, Spin, Table } from 'antd';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Context } from '../context';
import { useContext } from 'react';
import { isDisabled } from '../helpers';

export function ItemsListPage() {

    const {mutate: deleteItem} = useMutation((id) => fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'DELETE',
    }))

    const {
        itemsList, setItemsList, isLoading, error
      } = useContext(Context);
  
    if (isLoading) return (
        <Spin tip="Loading..." size="large" spinning={true}></Spin>
    );
  
    if (error) return <p>Ошибка: {error.message}</p>;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, item) => (
                <>
                    <Button className='tableButton' disabled={isDisabled(item.id)}><Link to="/edit" state={{edit: true, item}}>Изменить</Link></Button>
                    <Button className='tableButton' disabled={isDisabled(item.id)} onClick={() => {
                        deleteItem(item.id);
                        setItemsList(itemsList.filter(el => el.id !== item.id));
                        }}>Удалить</Button>
                </>
            
            ),
        },
    ];

    return (
        <div>
            <Button className='addButton' type="primary" size="large"><Link to="/edit" state={{edit: false}}>Добавить позицию</Link></Button>
            <Table columns={columns} dataSource={itemsList} />
        </div>  
    )
}