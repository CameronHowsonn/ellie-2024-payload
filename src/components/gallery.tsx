import { GalleryBlock } from '@/types/gallery-block'
import CustomImage from '@/components/image'
import { Media } from '@/payload-types'
import styled from 'styled-components'
import Section from '@/components/section'
import React, { use, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Text from '@/components/text'
import Container from '@/components/container'
import ReactPlayer from 'react-player'

import 'swiper/css'
import 'swiper/css/autoplay'
import UseIsMobile from '@/hooks/use-is-mobile'

interface GalleryProps {
  block: GalleryBlock
}

export const Gallery: React.FC<GalleryProps> = ({ block }) => {
  const galleryRef = useRef<any>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)
  const playerRef = useRef<ReactPlayer | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const isMobile = UseIsMobile()

  const handleNumberClick = (index: number) => {
    if (galleryRef.current?.swiper) {
      galleryRef.current.swiper.slideTo(index)
    }
  }

  useEffect(() => {
    setIsClient(true)
    return () => setIsClient(false)
  }, [])

  useEffect(() => {
    const handleAutoplay = () => {
      if (galleryRef.current) {
        if (isVideoPlaying) {
          document.body.classList.add('video-playing')
          galleryRef.current.swiper?.autoplay?.pause()
        } else {
          galleryRef.current.swiper?.autoplay?.resume()
          document.body.classList.remove('video-playing')
        }
      }
    }

    handleAutoplay()

    return () => {
      document.body.classList.remove('video-playing')
    }
  }, [isVideoPlaying])

  useEffect(() => {
    if (galleryRef.current && !isVideoPlaying) {
      galleryRef.current.swiper?.autoplay?.resume()
    }
  }, [activeSlide, isVideoPlaying])

  if (!isClient) {
    return null
  }

  return (
    <GalleryParent ref={sectionRef} id="gallery">
      <GallerySection ariaLabelledBy="" isVideoPlaying={isVideoPlaying}>
        <Container className="gallery">
          <Text
            variant="medium"
            color="var(--white)"
            className="subtitle"
            style={{ textTransform: 'uppercase' }}
          >
            Gallery
          </Text>
        </Container>
        <Container className="numbers">
          {!isMobile && (
            <Numbers isVideoPlaying={isVideoPlaying}>
              {block.images?.map((image, index) => {
                if (!image?.video && !image?.image) return null
                return (
                  <NumberButton key={index} onClick={() => handleNumberClick(index)}>
                    <Number className={activeSlide === index ? 'active' : ''} color="var(--white)">
                      {index + 1}
                    </Number>
                  </NumberButton>
                )
              })}
            </Numbers>
          )}
          {isMobile && (
            <Numbers isVideoPlaying={isVideoPlaying}>
              <Number
                onClick={() => {
                  galleryRef?.current?.swiper?.slidePrev()
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="var(--white)"
                  className="prev"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7.41 16.59L12 12 16.59 16.59 18 15.17 12 9 6 15.17z" />
                </svg>
              </Number>
              <Number
                onClick={() => {
                  galleryRef?.current?.swiper?.slideNext()
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="var(--white)"
                  className="next"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
              </Number>
            </Numbers>
          )}
        </Container>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          className="swiper"
          ref={galleryRef}
          onSlideChange={(swiper) => {
            setIsVideoPlaying(false)
            setActiveSlide(swiper.activeIndex)
          }}
          modules={!isVideoPlaying ? [Autoplay] : []}
          autoplay={
            !isVideoPlaying
              ? Boolean(
                  setTimeout(() => {
                    return { delay: 7500, disableOnInteraction: false, pauseOnMouseEnter: true }
                  }, 2500),
                )
              : undefined
          }
        >
          {block.images?.map((image, index) => {
            const imageItem = image?.image as Media

            if (!image?.video && !image?.image) return null

            return (
              <SwiperSlide key={index} className="embla__slide">
                {image?.video ? (
                  <div>
                    <PlayPause
                      onClick={(e) => {
                        // unblur the user
                        setIsVideoPlaying((prev) => !prev)
                        e.currentTarget.blur()
                      }}
                      isPlaying={isVideoPlaying}
                    >
                      <Text variant="medium" color="var(--white)">
                        {isVideoPlaying ? 'Pause' : 'Play'}
                      </Text>
                    </PlayPause>
                    <ReactPlayer
                      url={image?.video}
                      width="100%"
                      height="100%"
                      playing={isVideoPlaying}
                      loop
                      muted
                      playsinline
                      ref={playerRef}
                      controls
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 0,
                            rel: 0,
                            modestbranding: 0,
                            fs: 0,
                          },
                        },
                      }}
                      onPause={() => setIsVideoPlaying(false)}
                      onPlay={() => setIsVideoPlaying(true)}
                      onStart={() => setIsVideoPlaying(true)}
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                  </div>
                ) : (
                  <CustomImage
                    blurDataURL={imageItem?.base64 ?? undefined}
                    src={imageItem?.url ?? ''}
                    alt={imageItem?.alt}
                    fill
                    quality={100}
                    placeholder={imageItem?.base64 ? 'blur' : 'empty'}
                    loading="eager"
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </GallerySection>
    </GalleryParent>
  )
}

const PlayPause = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 9999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    top 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  isolation: isolate;
  transform-origin: 50% 50%;

  ${(props) =>
    props.isPlaying &&
    `
      transform: translate(-50%, -50%) scale(0.65);
      opacity: 0.5;
  `}

  &:hover {
    transform: translate(-50%, -50%) scale(1.25);
  }
`

const GallerySection = styled(Section)<{
  isVideoPlaying: boolean
}>`
  height: 100vh;
  max-height: 500px;
  padding: 0;
  position: relative;
  position: sticky;
  top: -2px;
  left: 0;

  @media (min-width: 48rem) {
    min-height: 600px;
    max-height: 900px;
  }

  @media (min-width: 1920px) {
    min-height: 800px;
    max-height: 1700px;
  }

  img {
    object-fit: cover;
    object-position: center;
  }

  &::before {
    content: ${(props) => (!props.isVideoPlaying ? "''" : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
    z-index: 2;
    pointer-events: none;
  }

  iframe {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .gallery {
    padding-block: 3rem;
    position: absolute;
    height: 3rem;
    width: max-content;
    left: 0;
    top: 2rem;
    transform: translateY(-50%);
    z-index: 2;
    overflow: hidden;
    transition: transform 0.3s;

    ${(props) =>
      props.isVideoPlaying &&
      `
      transform: translateY(-200%);
    `}
  }

  .numbers {
    padding-block: 3rem;
    position: absolute;
    height: 100%;
    width: 5rem;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    overflow: hidden;
  }

  .swiper {
    height: 100%;
  }

  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const GalleryParent = styled.div`
  position: relative;
`

const Numbers = styled.div<{
  isVideoPlaying: boolean
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2.5rem;
  padding: 1rem;
  z-index: 2;
  height: 100%;
  flex-wrap: wrap;
  max-height: 30rem;
  justify-content: flex-end;
  right: 0;
  transition: transform 0.3s;
  z-index: 999;
  gap: 0.25rem;

  .prev,
  .next {
    width: 1.5rem;
    height: 1.5rem;
  }

  .prev {
    transform: rotate(-90deg);
  }

  .next {
    transform: rotate(-90deg);
  }

  @media (min-width: 48rem) {
    bottom: 1rem;
  }

  ${(props) =>
    props.isVideoPlaying &&
    `
    transform: translateX(200%);
  `}

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--white);
  }
`

const Number = styled(Text)`
  transition: opacity 0.3s;
  background-color: rgba(0, 0, 0, 0.3);
  aspect-ratio: 1;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  border-radius: 5px;
  cursor: pointer;

  &.active {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const NumberButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    p {
      opacity: 1;
    }
  }
`

export default Gallery
