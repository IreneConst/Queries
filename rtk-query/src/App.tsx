import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersList from './components/mainComponents/UsersList';
import { AddUser } from './components/mainComponents/AddUser';
import { ContextProvider } from './contextProvider';
import { Layout } from 'antd';
import { AppHeader } from './components/mainComponents/AppHeader';
import { Login } from './components/mainComponents/Login';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="App">
          <Layout style={{ height: '100vh' }}>
            <Header className='header'><AppHeader/></Header>
            <Content style={{ overflow: 'scroll' }}>
              <Routes>
                <Route path="/list" element={<UsersList />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Content>
            <Footer>@Irene by ITentika</Footer>
          </Layout>
        </div>
    </BrowserRouter>
  </ContextProvider>
  )
}

export default App;
