import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
    const params = new URLSearchParams({
        key: '39488023-9004872802fc6e9eb72db0179',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 12,
    });
    const response = await axios.get(`?${params}`);
    return response.data;
}