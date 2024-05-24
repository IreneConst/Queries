export type NewUser = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  };

  export type Props = {
    children: string | JSX.Element | JSX.Element[]
};

export type User = {
  email: string,
  name: string,
  picture: string,
  isAuthorized: boolean
}