import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage, OAuth0LoginPage } from '../pages';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OAuth0LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
