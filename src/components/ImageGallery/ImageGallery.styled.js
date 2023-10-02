import styled from 'styled-components';

export const GalleryList = styled.ul`
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    padding-top: 60px;
    padding-bottom: 60px;
`;

export const GalleryListItem = styled.li`
    transition: transform ease-in 250ms;

    &:is(:hover, :focus) {
        transform: scale(1.02);
    }
`;