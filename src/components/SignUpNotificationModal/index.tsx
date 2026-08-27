import React from 'react';
import Link from 'next/link';
import Modal from '../../containers/Modal';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const SignUpNotificationModal = () => {
    const router = useRouter();

    return (
        <Modal isOpen={true} onClose={() => router.push("/")} title="Registro finalizado">
            <p className={styles.message}>Ingresa con tu correo electrónico y la contraseña que creaste</p>
            <Link href={"/"} className={styles.closeButton}>Ir a inicio</Link>
        </Modal>
    );
};

export default SignUpNotificationModal;