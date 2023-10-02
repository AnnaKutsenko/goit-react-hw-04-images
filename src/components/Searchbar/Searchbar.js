import { Component } from 'react';
import { StyledSearchbar, SearchForm, SearchFormBtn, SearchFormLabel,SearchFormInput } from './Searchbar.styled';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
    state = {
        value: '',
    };

    handleInputChange = e => {
        this.setState({ value: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { value } = this.state;

        if (!value.trim()) {
            toast.error('Searchfield cannot be empty, please enter some text', {
                duration: 3000,
            });

        return;
        }

        this.props.onSubmit(value);
        this.setState({ value: '' });
    }

    render() {
        const { value } = this.state;
        
        return (
            <StyledSearchbar>
                <SearchForm onSubmit={this.handleSubmit}>
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
                        onChange={this.handleInputChange}
                    />
                </SearchForm>
            </StyledSearchbar>
        );
    }
}