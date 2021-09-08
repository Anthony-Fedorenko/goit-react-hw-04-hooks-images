import {useState, useEffect} from "react";

import * as api from '../src/Api/Api';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem';
import Button from './Components/Button/Button';
import GalleryLoader from './Components/Loader/Loader';
import Modal from './Components/Modal/Modal';


export default function App() {
  const [hits, setHits] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [largeImageURL, setLargeImageURL] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!searchQuery) {
      return
    }
    fetchHits()

  }, [searchQuery])

  const onChangeQuery = query => {
    setSearchQuery(query)
    setHits([])
    setCurrentPage(1)
    setError(null)
  }

  const fetchHits = () => {
    const option = { searchQuery, currentPage }
    setIsLoading(true)
    api
        .fetchHits(option)
        .then(
            prevHits => setHits([...hits, ...prevHits]),
            setCurrentPage(currentPage + 1),
        )
        .then(smoothScroll)
        .catch(error => setError(error))
        .finally(() => setIsLoading(false))
  }

  const smoothScroll = () => {
    if (currentPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  const handleImageClick = url => {
    setLargeImageURL(url)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState)
  }

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading

  return (
      <div >
        <Searchbar onSubmit={onChangeQuery} />

        {error && <p>Sorry! Somethimg went wrong. Try again, please!</p>}

        <ImageGallery>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                  key={id}
                  srcWebformat={webformatURL}
                  pictureId={id}
                  onClick={() => handleImageClick(largeImageURL)}
              />
          ))}
        </ImageGallery>

        {isLoading && <GalleryLoader />}

        {shouldRenderLoadMoreButton && (
            <Button onClick={fetchHits} length={hits.length} />
        )}

        {isModalOpen && (
            <Modal onClose={toggleModal}>
              <img src={largeImageURL} alt="" />
            </Modal>
        )}
      </div>
  )
}