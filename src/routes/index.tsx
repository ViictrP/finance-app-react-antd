import PublicRoutes from './PublicRoutes.tsx';
import SecuredRoutes from './SecuredRoutes.tsx';

const Routes = () => {
  const signed = true;

  return (
    <>
      { signed ? <SecuredRoutes /> : <PublicRoutes /> }
    </>
  );
};

export default Routes;
