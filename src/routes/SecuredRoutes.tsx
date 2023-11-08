import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomePage, NotFoundPage} from '../pages';
import {Header} from "../components";

const SecuredPage = ({children}: { children: any }) => {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

const SecuredRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<SecuredPage><HomePage/></SecuredPage>)}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default SecuredRoutes;
