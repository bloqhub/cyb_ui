import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
} from 'react';
import styles from './carousel.scss';

const cx = require('classnames');

const Carousel = ({
  slides = [],
  speed = 3000,
  activeStep,
  setStep,
  transitionSpeed = 500,
  slideWidth = 200,
  disableNext,
}) => {
  if (slides.length < 2) {
    console.error('Please provide more slides');
    return null;
  }

  const [visibleSlide, setVisibleSlide] = useState(1);
  const [hasTransitionClass, setHasTransitionClass] = useState(true);
  const [stateSlides, setStateSlides] = useState(slides);
  const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false);
  const intervalId = useRef(null);

  useEffect(() => {
    setVisibleSlide(activeStep);
  }, [activeStep]);

  // useEffect with an empty array as the second parameter
  // will run only once, when the component mounts
  // this makes it an ideal place to trigger this functionality
  useEffect(() => {
    const slidesWithClones = [...slides];
    slidesWithClones.unshift({});
    slidesWithClones.push({});
    setStateSlides(slidesWithClones);
  }, []);

  // Whenever the left and right arrows are disabled
  // We want to enable them again after a specific
  // period of time, this is to prevent problematic
  // spamming of these controls during our clone
  // slide-cloning/swapping mechanism
  // Probably a better way to handle this though
  useEffect(() => {
    if (leftAndRightDisabled) {
      setTimeout(() => {
        setLeftAndRightDisabled(false);
      }, transitionSpeed * 2);
    }
  }, [leftAndRightDisabled]);

  const calculateLeftMargin = () => {
    return `-${visibleSlide * slideWidth - slideWidth}px`;
  };

  const slideDimensionStyles = () => {
    return { width: `${slideWidth}px` };
  };

  const setActiveItem = useCallback(
    (index) => {
      if (index !== 0 && index <= slides.length) {
        // setVisibleSlide(index);
        if (index <= visibleSlide) {
          setStep(index);
        } else if (!disableNext && index > visibleSlide) {
          setStep(index);
        }
      }
    },
    [disableNext, visibleSlide]
  );

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slidesContainer}
        // style={slideDimensionStyles()}
      >
        <div
          id="slides"
          className={cx(styles.slides, {
            [styles.transition]: hasTransitionClass,
          })}
          style={{ left: calculateLeftMargin() }}
        >
          {stateSlides.map((slide, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={index}
                onClick={() => setActiveItem(index)}
                className={cx(styles.slide, {
                  [styles.active]: index === visibleSlide,
                  [styles.left]: index + 1 === visibleSlide,
                  [styles.right]: index - 1 === visibleSlide,
                })}
                style={slideDimensionStyles()}
              >
                <div
                  className={cx(styles.lamp, {
                    [styles.active]: index === visibleSlide,
                    [styles.left]: index + 1 === visibleSlide,
                    [styles.right]: index - 1 === visibleSlide,
                  })}
                >
                  <div className={styles.containerContent}>
                    {!!slide.step && (
                      <div className={styles.step}>step {slide.step}</div>
                    )}
                    {!!slide.title && (
                      <div className={styles.title}>{slide.title}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
