import { GoogleLogin } from "@react-oauth/google";
import { Flex } from "antd";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { decodeJWT } from "../../constants";
import { useContext } from "react";
import { Context } from "../../contextProvider";

export const Login = () => {
    const navigate = useNavigate();
    const { setAuthorizatedUserData } = useContext(Context);

    return (
        <Flex className='login' justify='center' align='center'>
            <GoogleLogin
            size='large'
            text='signin_with'
            shape='pill'
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                console.log(decodeJWT(credentialResponse.credential));
                const userData = decodeJWT(credentialResponse.credential);
                setAuthorizatedUserData({...userData, isAuthorized: true});
                navigate('/list');
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </Flex>
    )
}
