import {useEffect} from "react";
import {createPortal} from "react-dom";
import PropTypes from 'prop-types'

import style from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ children, onClose }) {
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose()
        }
    }

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    return createPortal(
        <div className={style.Overlay} onClick={handleBackdropClick}>
            <div className={style.Modal}>{children}</div>
        </div>,
        modalRoot,
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
}