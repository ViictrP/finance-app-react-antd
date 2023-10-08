import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, NotFoundPage } from '../pages';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
