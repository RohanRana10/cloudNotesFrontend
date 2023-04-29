import React from 'react'
import styles from './css/spinner.module.css'
import loading from './loading.gif'

const Spinner = () => {
    return (
        <div>
            <img className={`my-3 ${styles.loader}`} src={loading} alt="loading" />
        </div>
    )
}

export default Spinner
