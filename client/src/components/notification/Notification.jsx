import './notificationStyle.scss';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); 

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button onClick={onClose}>×</button>
        </div>
    );
};

export default Notification;
