import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDragons } from '../redux/dragons/dragons';
import ProfileSection from './profileSection';
import './rockets.css';

function Myprofile() {
  const dispatch = useDispatch();
  const { rockets } = useSelector((state) => state.rocket);
  const ProfileRockets = rockets.filter((item) => item.reserved === true);
  const rocketsToShow = ProfileRockets.map((item) => (
    <ProfileSection key={item.id} name={item.rocket_name} />
  ));

  const dragons = useSelector((state) => state.dragons);
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== 'development') {
      if (dragons.length === 0) {
        dispatch(getAllDragons());
      }
    }
    effectRan.current = true;
  }, []);

  return (
    <div className="main-container">
      <div className="reserved-rockets">
        <h3 className="rockets-title">My Rockets</h3>
        <div className="rockets">{rocketsToShow}</div>
      </div>
      <div className="resered-dragons">
        <h3 className="dragons-title">My Dragons</h3>
        <ul className="dragons-cont">
          {dragons.filter((dragon) => dragon.reserved === true).map((dragon) => (
            <li
              key={dragon.id}
              className="dragon"
            >
              {dragon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Myprofile;
