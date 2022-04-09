import { useRoutes } from "raviger";
import App from "../App";
import AppContainer from "../AppContainer";
import About from "../components/About";
import Home from "../components/Home";
import Form from "../components/NewForm";
import Header from "../Header";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer>
      <div className="p-4 w-full justify-center bg-white shadow-lg rounded-xl items-center font-bold">
        <Header title={"Welcome"} />
        {routeResult}
      </div>
    </AppContainer>
  );
}
