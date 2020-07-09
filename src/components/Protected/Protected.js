import { useEffect, useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { navigate } from '@reach/router';

export default function Protected({ view }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  });

  return user ? view : null;
}