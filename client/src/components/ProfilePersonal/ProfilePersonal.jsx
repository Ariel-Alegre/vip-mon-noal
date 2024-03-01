import * as React from "react";
import styles from './ProfilePersonal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { dataPersonal  } from '../../redux/action'



export default function ProfilePersonal() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  
  const datapersonal = useSelector((state) => state.datapersonal);
  React.useEffect(() => {
    dispatch(dataPersonal(token))
  }, [dispatch, token]);
  return (
    <div className={` ${styles.bg_profile}`}>
      <div className="px-4 sm:px-0">
        <h3 className={`text-base font-semibold leading-7 ${styles.text}`}>Información personal</h3>
        <p className={`mt-1 max-w-2xl text-sm leading-6 ${styles.text}`}>Mi información.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${styles.text}`}>Nombre</dt>
            <dd className={`mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ${styles.text}`}>{datapersonal.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${styles.text}`}>Apellido</dt>
            <dd className={`mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ${styles.text}`}>{datapersonal.lastName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${styles.text}`}>Telefono</dt>
            <dd className={`mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ${styles.text}`}>{datapersonal.phone}</dd>
          </div>
    
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
            <dt className={`text-sm font-medium leading-6 ${styles.text}`}>Correo electrónico</dt>
            <dd className={`mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ${styles.text}`}>{datapersonal.email}</dd>
          </div>
      
  
        </dl>
      </div>
    </div>
  )
}
