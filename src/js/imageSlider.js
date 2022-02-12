export default class ImageSlider {
  #currentPosition = 0;

  #sliderNumber = 0;

  #slideWidth = 0;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  prevBtnEl;

  indicatorWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
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

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
  }

  moveToRight() {
    this.#currentPosition += 1;

    if (this.#currentPosition > this.#sliderNumber) {
      this.#currentPosition = 0;
    }

    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;

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
}
