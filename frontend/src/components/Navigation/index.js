import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotFormModal from '../Spots/CreateSpotModal';
import './Navigation.css';
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';

import AirbnbLogo from "../../resources/images/Airclone-Logo.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  return (
    <ul className='navBar'>
      <li className='navListItem'>
        <div>
          <NavLink className='HomeButton' exact to="/"><img className='airbnbLogo' src={AirbnbLogo} alt='Logo' /></NavLink>
        </div>
        <div className='profilehostDiv'>
          <div className='profileButtonDiv'>
            {isLoaded && (
              <ProfileButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal} />
            )}
          </div>
          <div>
            {sessionUser && <CreateSpotFormModal />}
          </div>
        </div>
      </li >
      {showModal && (
        <Modal onClose={() => { setShowModal(false) }}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
        </Modal>
      )}
    </ul>
  );
}

export default Navigation;