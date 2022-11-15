import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotFormModal from '../CreateSpotModal'
import './Navigation.css';
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal} />
        )}
        {sessionUser && <CreateSpotFormModal />}
      </li>
      {showModal && (
        <Modal onClose={() => { setShowModal(false) }}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
        </Modal>
      )}
    </ul>
  );
}

export default Navigation;