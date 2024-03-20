const EFFECTS = {
  origin: {
    filter: 'none',
    unit: '',
    min: 100,
    max: 100,
    step: 1,
    start: 100,
    connect: 'lower',
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    connect: 'lower',
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    connect: 'lower',
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    connect: 'lower',
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    connect: 'lower',
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    connect: 'lower',
  }
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');


const currentEffect = {
  filter: '',
  unit: '',
};

const chosenEffect = EFFECTS.origin;

const isOrigin = () => chosenEffect === EFFECTS.origin;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: EFFECTS.origin.min,
    max: EFFECTS.origin.max,
  },
  start:  EFFECTS.origin.start,
  step:  EFFECTS.origin.step,
  connect: EFFECTS.origin.connect,
});

const setEffectPicture = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgUploadPreview.style.filter =
  `${currentEffect.filter}(${effectLevelValue.value}${currentEffect.unit})`;
};

const updateSliderOptions = ({ min, max, start, step, connect}) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start,
    step,
    connect,
  });
};

export const resetEffectPicture = () => {
  if (isOrigin) {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = '';
    effectLevelValue.value = '';
  }
};

effectsList.addEventListener('click', (evt) => {
  const effect = evt.target.closest('.effects__radio');

  if (evt.target.value === EFFECTS.origin.filter) {
    resetEffectPicture();

  } else {
    imgUploadEffectLevel.classList.remove('hidden');
    currentEffect.unit = EFFECTS[effect.value].unit;
    currentEffect.filter = EFFECTS[effect.value].filter;
    updateSliderOptions(EFFECTS[effect.value]);
  }
});

effectLevelSlider.noUiSlider.on('update', setEffectPicture);
