import { bloodElements } from "./bloodElements.js";
import { DOM } from './DOM.js';

'use strict'

console.log(bloodElements);

const qSelectAll = (items) => {
  return document.querySelectorAll(items);
}

const overlayDisplayToggler = () => {
  overlay.classList.toggle('overlay-active');
}

const deleteElementFromUI = (IDName, idNum) => {
  const el = document.getElementById(`${IDName}${idNum}`);
  el.parentNode.removeChild(el);
};

const clearElementsListfromUI = () => {
  DOM.elementsList.forEach(el => {
    el.innerHTML = '';
  });
}

const getIDNumber = (str) => {
  const IDnameArr = str.split('-');
  const idNum = parseInt(IDnameArr[2]);
  return idNum;
};

const deleteFromDataStructure = (arr, index) => {
  arr.splice(index, 1);
};

const nav = qSelectAll('.nav__link');
const close = qSelectAll('.close');
const popups = qSelectAll('.popup');
const overlay = document.querySelector('.overlay');

nav.forEach((el, i) => {
  el.addEventListener('click', (e) => {
    popups[i].classList.add('popup-active');
    overlayDisplayToggler();
  });
});

const closePopup = () => {
  for (const i of popups) {
    if (i.classList.contains('popup-active')) i.classList.remove('popup-active');
  }
  overlayDisplayToggler();
}

close.forEach(el => {
  el.addEventListener('click', () => {
    closePopup();
  })
});


document.addEventListener('click', (event) => {
  if (event.target.className === 'overlay overlay-active') closePopup();
});

document.addEventListener('keydown', (event) => {
  if (overlay.className.includes('active')) {
    if (event.key === 'Escape') closePopup();
  }
});

class bloodTest {
  constructor(id, date, location) {
    this.id = id;
    this.date = date;
    this.location = location;
    this.elements = [];
  }
}

const userBloodTests = [];
let currTest = -1;

const failOrSuccessPopup = (res) => {
  const box = document.querySelector(`.message-box`);
  box.classList.remove('message-box-success');
  box.classList.remove('message-box--fail');
  box.classList.add(`message-box--${res}`);
  const popupSpan = document.querySelector('.message-box__text span');
  if (res === 'success') {
    document.querySelector('.message-box__text use').href.baseVal = "img/sprites.svg#icon-checkmark";
    popupSpan.textContent = "Dodano nowe badanie, możesz teraz uzupełnić wyniki morfologii.";
  } else {
    document.querySelector('.message-box__text use').href.baseVal = "img/sprites.svg#icon-close";
    popupSpan.textContent = "Błąd! Uzupełnij wszystkie pola i spróbuj ponownie.";
  }
  box.style.opacity = 1;
  box.style.display = 'block';
  setTimeout(() => { box.style.opacity = 0; box.style.display = 'none' }, 4500);
};

DOM.okBtn.addEventListener('click', () => {
  const dateField = DOM.datePicker.value;
  const locationField = DOM.testLocation.value;
  if (dateField && locationField) {
    clearElementsListfromUI();
    const testID = IDgenerator(userBloodTests);
    currTest = testID;
    const newBloodTest = new bloodTest(testID, dateField, locationField);
    userBloodTests.push(newBloodTest);
    updateTestsList(newBloodTest);
    failOrSuccessPopup('success');
  } else {
    failOrSuccessPopup('fail');
  }
});

const getValue = (IDName) => parseFloat(document.querySelector(IDName).value);
const clearResults = () => {
  DOM.elementPicker.value = '';
  DOM.userResult.value = '';
  DOM.referenceFrom.value = '';
  DOM.referenceTo.value = '';
}

const IDgenerator = (arr) => {
  let id;
  arr.length < 1 ? id = 0 : id = arr[arr.length - 1].id + 1;
  return id;
}

DOM.addBtn.addEventListener('click', () => {
  const referenceFrom = getValue('#reference-from');
  const referenceTo = getValue('#reference-to');
  const result = getValue('#result');
  const elementPickerValue = DOM.elementPicker.value;
  if (currTest >= 0 && DOM.elementPicker.value && referenceFrom && referenceTo && result && elementPickerValue) {
    const fullElementName = DOM.elementPicker.options[DOM.elementPicker.selectedIndex].text;
    const bloodElementID = IDgenerator(userBloodTests[currTest].elements);
    const newElement = { id: bloodElementID, name: fullElementName, res: result, refFrom: referenceFrom, refTo: referenceTo, elPickerVal: elementPickerValue };
    userBloodTests[currTest].elements.push(newElement);
    addElementToUI(newElement);
    clearResults();
  }
});

const userResultCheck = (res, refFrom, refTo) => {
  if (res >= refFrom && res <= refTo) {
    return 'checkmark';
  } else if (res < refFrom) {
    return 'arrow-down2';
  } else {
    return 'arrow-up2';
  }
};

const addElementToUI = ({ id, name, res, refFrom, refTo, elPickerVal }) => {
  const userCheck = userResultCheck(res, refFrom, refTo);
  const newElementHTML = `<div class="blood-element" id="blood-element-${id}"><div class="blood-element__element-name"><span>${name}</span><div class="query-box"><span>?</span><div class="details-popup">${bloodElements[elPickerVal].description}</div></div></div><div class="blood-element__result ${userCheck === 'checkmark' ? 'user-pass' : 'user-fail'}"><span>${res}</span><svg class="icon-medium margin-left-small"><use xlink:href="img/sprites.svg#icon-${userCheck}"></use></svg></div><div class="blood-element__unit"><span>${bloodElements[elPickerVal].unit}</span></div><div class="blood-element__reference"><span>${refFrom} - ${refTo}</span><div class="blood-element__delete-icon"><a id="btn-delete" title="Usuń składnik"><svg class="icon-medium delete-icon"><use xlink:href="img/sprites.svg#icon-close"></use></svg></a></div></div></div>`;
  DOM.elementsList.forEach(el => {
    el.insertAdjacentHTML('beforeend', newElementHTML);
  });
};

// const removeElementsFromUI = (i) => {
//   const elements = qSelectAll(`#blood-element-${i}`);
//   elements.forEach(el => el.parentNode.removeChild(el));
// };

const deleteElement = (event) => {
  if (event.target.parentNode.classList.contains('delete-icon')) {
    const ElIDnameStr = event.target.closest('.blood-element').id;
    if (ElIDnameStr) {
      const id = getIDNumber(ElIDnameStr);
      const index = userBloodTests[currTest].elements.findIndex(obj => obj.id === id);
      if (index !== -1) {
        deleteFromDataStructure(userBloodTests[currTest].elements, index);
        deleteElementFromUI('blood-element-', id);
        // removeElementsFromUI(index);
      }
    }
  }
};

DOM.elementsList.forEach(el => {
  el.addEventListener('click', deleteElement);
});

const noAdedTestsInformationToggle = () => {
  if (userBloodTests.length < 1) {
    DOM.noTestsBox.style.display = 'block';
  } else {
    DOM.noTestsBox.style.display = 'none';
  }
};

const updateTestsList = ({ id, date, location }) => {
  noAdedTestsInformationToggle();
  const [year, month, day] = date.split('-');
  const newTestHTML = `<div class="user-tests__item" id="user-test-${id}"><span class="red-label">${id + 1}.</span><span>Badanie z dnia ${day}-${month}-${year}, w ${location}</span><button class="btn-round btn-round--small margin-left-small" id="btn-options" title="Pokaż opcje"><svg class="icon-medium icon-grey margin-top-small"><use xlink:href="img/sprites2.svg#icon-menu"></use></svg></button><div class="user-tests__options"><button id="btn-open-test" class="btn-round btn-round--big margin-right-medium" title="Otwórz badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites.svg#icon-launch"></use></svg></button><button id="btn-download-test" class="btn-round btn-round--big margin-right-medium" title="Pobierz badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites1.svg#icon-save_alt"></use></svg></button><button id="btn-delete-test" class="btn-round btn-round--big margin-right-medium" title="Usuń badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites1.svg#icon-trash-2"></use></svg></button><button id="btn-return" class="btn-round btn-round--big" title="Powrót"><svg class="icon-big icon-grey"><use xlink:href="img/sprites2.svg#icon-corner-down-left"></use></svg></button></div></div>`;
  DOM.userTests.insertAdjacentHTML('beforeend', newTestHTML);
};

const clearTestInputFields = () => {
  DOM.datePicker.value = '';
  DOM.testLocation.value = '';
};

DOM.addAnotherTestBtn.addEventListener('click', () => {
  clearTestInputFields();
  clearElementsListfromUI();
  currTest = -1;
});

DOM.enlargeBtn.addEventListener('click', () => {
  DOM.container.style.display = 'none';
  DOM.containerEnlarged.style.display = 'block';
});

DOM.shrinkBtn.addEventListener('click', () => {
  DOM.containerEnlarged.style.display = 'none';
  DOM.container.style.display = 'block';
});

const userTestOptionsDisplayToggle = (e, id) => {
  if (e.target.parentNode.id === 'btn-options' ||
    e.target.id === 'btn-options' ||
    e.target.parentNode.parentNode.id === 'btn-options' ||
    e.target.parentNode.parentNode.id === 'btn-return' ||
    e.target.parentNode.id === 'btn-return' ||
    e.target.id === 'btn-return'
  ) {
    const el = document.querySelector(`#user-test-${id} .user-tests__options`);
    el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
  }
};

const openTest = (e, id) => {
  if (e.target.parentNode.parentNode.id === 'btn-open-test' ||
    e.target.id === 'btn-open-test' ||
    e.target.parentNode.id === 'btn-open-test') {
    currTest = id;
    DOM.datePicker.value = userBloodTests[id].date;
    DOM.testLocation.value = userBloodTests[id].location;
    clearElementsListfromUI();
    userBloodTests[id].elements.forEach(el => addElementToUI(el));
  }
};

const downloadTest = (e, id) => {
  if (e.target.parentNode.id === 'btn-download-test' ||
    e.target.id === 'btn-download-test' ||
    e.target.parentNode.parentNode.id === 'btn-download-test') {
    console.log(`Works`);
  }
};

const deleteTest = (e, id) => {
  if (e.target.parentNode.id === 'btn-delete-test' ||
    e.target.id === 'btn-delete-test' ||
    e.target.parentNode.parentNode.id === 'btn-delete-test') {
    const index = userBloodTests.findIndex(obj => obj.id === id);
    if (index !== -1) {
      deleteFromDataStructure(userBloodTests, index);
      deleteElementFromUI('user-test-', id);
      noAdedTestsInformationToggle();
    }
    if (id === currTest) {
      clearElementsListfromUI();
      clearTestInputFields();
    }
  }
};

DOM.userTests.addEventListener('click', (event) => {
  if (userBloodTests.length > 0) {
    const testIDnameStr = event.target.closest('.user-tests__item').id;
    const testID = getIDNumber(testIDnameStr);
    userTestOptionsDisplayToggle(event, testID);
    openTest(event, testID);
    downloadTest(event, testID);
    deleteTest(event, testID);
  }
});

// document.querySelector('.btn-test').addEventListener('click', () => {
//   const el = document.querySelector('.user-analysis');
//   html2pdf(el);
// });