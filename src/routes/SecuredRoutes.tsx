import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, NotFoundPage } from '../pages';

const SecuredRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SecuredRoutes;
