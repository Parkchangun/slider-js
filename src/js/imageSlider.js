export default class ImageSlider {
  #currentPosition = 0;

  #sliderNumber = 0;

  #slideWidth = 0;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  prevBtnEl;

  indicatorWrapEl;

  #intervalId;

  #autoplay = true;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.createIndicator();
    this.setIndicator();
    this.initAutoPlay();
    this.setAddEventListener();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length - 1;
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderWrapEl.getBoundingClientRect().width;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#sliderNumber * this.#slideWidth
    }px`;
  }

  setAddEventListener() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener(
      'click',
      this.toggleAutoplay.bind(this),
    );
  }

  onClickMoveTo() {
    if (this.#intervalId && this.#autoplay) {
      clearInterval(this.#intervalId);
      this.initAutoPlay();
    }
  }

  moveToRight() {
    this.#currentPosition += 1;

    if (this.#currentPosition > this.#sliderNumber) {
      this.#currentPosition = 0;
    }

    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;

    this.onClickMoveTo();
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;

    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#sliderNumber;
    }

    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;

    this.onClickMoveTo();
    this.setIndicator();
  }

  createIndicator() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i <= this.#sliderNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = `${i}`;
      fragment.appendChild(li);
    }

    this.indicatorWrapEl.querySelector('ul').appendChild(fragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');

    // HTML에서 유효하지만 CSS 선택기 에서 정수로 시작하는 ID를 사용할 수 없습니다.
    // document.querySelector("[id='22']")
    this.indicatorWrapEl
      .querySelector(`[data-index='${this.#currentPosition}']`)
      .classList.add('active');
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);

    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;

      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;

      this.setIndicator();
    }
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  toggleAutoplay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoplay = true;
      this.controlWrapEl.classList.replace('pause', 'play');
      this.initAutoPlay();
    } else if (event.target.dataset.status === 'pause') {
      this.#autoplay = false;
      this.controlWrapEl.classList.replace('play', 'pause');
      clearInterval(this.#intervalId);
    }
  }
}
