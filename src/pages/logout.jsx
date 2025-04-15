import { useDispatch } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
