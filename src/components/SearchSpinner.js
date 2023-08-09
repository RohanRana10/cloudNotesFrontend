import styles from './css/spinner.module.css'
import loading from './loaderForSearch.gif'

import React from 'react'

const SearchSpinner = () => {
    return (
        <div>
            <img className={`${styles.searchLoader}`} src={loading} alt="loading" />
        </div>
    )
}

export default SearchSpinner

