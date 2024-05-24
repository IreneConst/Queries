import '../../App.css';
import { Button, Card, Flex, Image, message, Space, Spin, Tooltip, Typography } from 'antd';
import useWebSocket from 'react-use-websocket';
import { PlusIcon } from '../icons/PlusIcon';
import { SendIcon } from '../icons/SendIcon';
import { fallbackImage } from '../../assets/fallbackImage';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../contextProvider';
import { useDeleteUserMutation } from '../../jsonServerApi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NewUser } from '../../types';

const { Title } = Typography;

function UsersList() {
  // react-use-websocket

  const { sendMessage } = useWebSocket('wss://echo.websocket.org', {
    onOpen: () => console.log('opened'),
    onMessage: (e) => {
      console.log({message: e.data})
      info(e.data)
    },
  });

// native ws

// let socket = new WebSocket('wss://echo.websocket.org');
// socket.onopen = () => console.log('WebSocket opened');
// socket.onmessage = (e) => console.log({message: e.data, ws: 'native ws'});

  const [messageApi, contextHolder] = message.useMessage();

  const info = (message: string) => {
    messageApi.info(message);
  };

  const { usersList, setUsersList, isLoading } = useContext(Context);

  const [ deleteUser ] = useDeleteUserMutation();

  const onDeleteUser = (id: string) => {
    deleteUser(id);
    setUsersList(usersList.filter((user: NewUser) => user?.id !== id));
  };

  if (isLoading) return <Spin tip="Processing..." size="large"/>;

  return (
    <div className="App">
       <Title>Users List</Title>
       <Flex justify='space-around' align='center'>
        <Tooltip title='Add user'>
            <Link to="/add-user">
                <Button className='addButton' type="primary" size='large' shape='circle' icon={<PlusIcon />} style={{marginBottom: '20px'}} />
            </Link>
       </Tooltip>

       <Tooltip title='Send message'>
       {contextHolder}
        <Button type="primary" size='large' shape='circle' icon={<SendIcon />} style={{marginBottom: '20px'}} 
        // onClick={() => socket.send("hi")}/>
        onClick={() => sendMessage("hi")}/>

       </Tooltip>
       </Flex>
       
        <Space size='large' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: '30px'}}>
        {!usersList?.length && <div>No data</div>}
         
        {usersList?.map((card: any) => (
          <Card 
            key={card?.id} 
            hoverable 
            title={`${card?.first_name} ${card?.last_name}`} 
            size='default' 
            cover={<Image fallback={fallbackImage} preview={false} width={400} alt={card?.id} src={card?.avatar} />}
            actions={[
              <Link to="/add-user" state={ {user: card, edit: true} }>
                <EditOutlined key="edit" />
              </Link>,
              <DeleteOutlined key="delete" onClick={() => onDeleteUser(card?.id)}/>,
            ]}
            >
            <Card.Meta title={card?.email} />
          </Card>
          )
        )}
        </Space>  
      
    </div>
  );
}

export default UsersList;
