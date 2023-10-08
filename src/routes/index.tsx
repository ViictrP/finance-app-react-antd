import PublicRoutes from './PublicRoutes.tsx';
import SecuredRoutes from './SecuredRoutes.tsx';
import { useAuth } from '../context/hooks';

const Routes = () => {
  const { signedIn } = useAuth();

  return <>{signedIn ? <SecuredRoutes /> : <PublicRoutes />}</>;
};

export default Routes;
