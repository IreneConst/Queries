import { Avatar, Button, Flex } from "antd";
import '../../App.css';
import { useCallback, useContext } from "react";
import { Context } from "../../contextProvider";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { defaultUser } from "../../constants";

export const AppHeader = () => {
  const { authorizatedUserData, setAuthorizatedUserData } = useContext(Context);

  const onLogout = useCallback(() => {
    googleLogout();
    setAuthorizatedUserData(defaultUser)
  }, [setAuthorizatedUserData])

  return (
    <Flex className="appHeader">
      <Flex className="headerUser" justify='space-between' align='center'>
        <Flex>{`Hello, ${authorizatedUserData.name}`}</Flex>
        <Flex align='center'>
          <Avatar size='large' icon={<UserOutlined />} src={authorizatedUserData.picture} />
        </Flex>
        {authorizatedUserData.isAuthorized ? <Button ghost onClick={onLogout}>Log out</Button>
        : <Link to='/login'>
          <Button ghost>Log in</Button>
        </Link>
        }
      </Flex>
    </Flex>
  )
}
