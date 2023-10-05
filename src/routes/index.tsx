import PublicRoutes from './PublicRoutes.tsx';
import SecuredRoutes from './SecuredRoutes.tsx';
import { useAuth0 } from '@auth0/auth0-react';

const Routes = () => {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated ? <SecuredRoutes /> : <PublicRoutes />}</>;
};

export default Routes;
