import axios from "axios";


axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "21940379-165654ee27b0a15257d8ffa36";

const fetchHits = ({ searchQuery = "", currentPage = 1, pageSize = 12 }) => {
    return axios
        .get(
            `/?key=${KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
        )
        .then((response) => response.data.hits);
}


export { fetchHits }