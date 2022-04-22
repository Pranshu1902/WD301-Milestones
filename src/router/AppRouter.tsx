import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import About from "../components/About";
import Home from "../components/Home";
import NewForm from "../components/NewForm";
import Header from "../Header";
import Preview from "../components/Preview";
import Login from "../components/Login";
import { User } from "../types/userTypes";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <NewForm id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <Preview id={Number(id)} />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>
      <div className="p-4 w-full justify-center bg-white shadow-lg rounded-xl items-center font-bold">
        <Header currentUser={props.currentUser} title={"Welcome"} />
        {routeResult}
      </div>
    </AppContainer>
  );
}
