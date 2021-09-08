import {useState} from "react";
import style from './Searchbar.module.css'

export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('')

    const handleChange = e => {
        const queryValue = e.currentTarget.value.toLowerCase().trim()
        setQuery(queryValue)
    }

    const handleSubmit = e => {
        e.preventDefault()

        onSubmit(query)

        setQuery('')
    }

    return (
        <header className={style.Searchbar}>
            <form className={style.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.SearchFormButton}>
                    <span className={style.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={style.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleChange}
                />
            </form>
        </header>
    )
}