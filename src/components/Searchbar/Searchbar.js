import { useState } from 'react';
import { StyledSearchbar, SearchForm, SearchFormBtn, SearchFormLabel,SearchFormInput } from './Searchbar.styled';
import toast from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleInputChange = e => {
        setValue(e.currentTarget.value );
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!value.trim()) {
            toast.error('Searchfield cannot be empty, please enter some text', {
                duration: 3000,
            });

        return;
        }

        onSubmit(value);
        setValue('');
    }

    return (
        <StyledSearchbar>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormBtn type="submit">
                    <SearchFormLabel>Search</SearchFormLabel>
                </SearchFormBtn>

                <SearchFormInput
                    className="input"
                    type="text"
                    value={value}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleInputChange}
                />
            </SearchForm>
        </StyledSearchbar>
    );
}
