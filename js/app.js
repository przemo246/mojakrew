'use strict'

const qSelectAll = (items) => {
  return document.querySelectorAll(items);
}

const overlayDisplayToggler = () => {
  overlay.classList.toggle('overlay-active');
}

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
  if(overlay.className.includes('active')) {
    if(event.key === 'Escape') closePopup();
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

const DOM = {
  addBtn: document.querySelector('#btn-add'),
  elementPicker: document.querySelector('#test'),
  userResult: document.querySelector('#result'),
  referenceFrom: document.querySelector('#reference-from'),
  referenceTo: document.querySelector('#reference-to'),
  removeElementBtn: document.querySelector('#btn-delete'),
  elementsList: document.querySelectorAll('.elements-list'),
  noTestsBox: document.querySelector('.notests-box'),
  userTests: document.querySelector('.user-tests'),
  addAnotherTestBtn: document.querySelector('#btn-add-new'),
  datePicker: document.querySelector('#test-date'),
  testLocation: document.querySelector('#test-location'),
  enlargeBtn: document.querySelector('#icon-enlarge'),
  container: document.querySelector('.container'),
  containerEnlarged: document.querySelector('.container-enlarged'),
  shrinkBtn: document.querySelector('#icon-shrink'),
  navigationPanel: document.querySelector('.navigation-panel'),
  okBtn: document.querySelector('#btn-ok'),
  userTestsItem: document.querySelector('.user-tests__item'),
  userTestsOptions: document.querySelector('.user-tests__options'),
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
  setTimeout(() => { box.style.opacity = 0},4500);
}

DOM.okBtn.addEventListener('click', () => {
  const dateField = DOM.datePicker.value;
  const locationField = DOM.testLocation.value;
  if (dateField && locationField) {
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

const bloodElements = {
  leukocyty: {
    description: 'Elementy morfotyczne krwi. Są niemal bezbarwne i mniej liczne od erytrocytów, posiadają zdolność ruchu. Żyją od kilku dni (granulocyty) nawet do 20 lat (limfocyty B pamięci immunologicznej). Ich zadaniem jest ochrona organizmu przed patogenami, takimi jak wirusy i bakterie. Wszystkie leukocyty wykazują ekspresję cząsteczki CD45.',
    unit: 'G/l'
  },
  erytrocyty: {
    description: 'Krwinka czerwona, czerwone ciałko krwi – morfotyczny składnik krwi, którego głównym zadaniem jest przenoszenie tlenu z płuc do pozostałych tkanek organizmu.',
    unit: 'T/l',
  },
  hemoglobina: {
    description: 'Czerwony barwnik krwi, białko zawarte w erytrocytach, którego zasadniczą funkcją jest transportowanie tlenu – przyłączanie go w płucach i uwalnianie w tkankach. Mutacje genu hemoglobiny prowadzą do chorób dziedzicznych: anemii sierpowatej, talasemii lub rzadkich chorób zwanych hemoglobinopatiami.',
    unit: 'g/dl'
  },
  hematokryt: {
    description: 'Stosunek objętości erytrocytów do objętości pełnej krwi.',
    unit: '%'
  },
  mcv: { 
    description: '(z ang. Mean Corpuscular Volume) - Średnia objętość krwinki czerwonej. Znajdująca się w nich hemoglobina odpowiedzialna jest za transport tlenu do komórek, natomiast odpowiednia ilość tlenu potrzebna jest do poprawnego funkcjonowania naszego organizmu. Zatem parametr MCV wyraża ilość zawartego w organizmie badanego hematokrytu oraz ilość krwinek czerwonych.',
    unit: 'fl'
  },
  mch: {
    description: '(z ang. Mean Corpuscular Hemoglobin) to średnia waga hemoglobiny w czerwonej krwince. Średnia ta otrzymywana jest z podzielenia stężenia hemoglobiny przez liczbę erytrocytów.',
    unit: 'pg'
  },
  mchc: { 
    description: 'Jest jednym z parametrów oznaczanych podczas morfologii krwi. Jest to wskaźnik określający średnie stężenie hemoglobiny w erytrocytach, czyli czerwonych krwinkach. Poziom MCHC mówi wiele o zdrowiu człowieka. Podwyższone poziom tego wskaźnika może świadczyć o odwodnieniu, a obniżony o anemii.',
    unit: 'g/dl'
  },
  rdw: {
    description: 'To wskaźnik rozkładu objętości erytrocytów (czerwonych krwinek). Wskaźnik ten ocenia różnice w wielkości poszczególnych krwinek czerwonych.',
    unit: '%'
  },
  plytkikrwi: {
    description: 'Trombocyty, inaczej płytki krwi bądź krwinki płytkowe, to obok białych i czerwonych krwinek elementy morfotyczne krwi. Płytki krwi odgrywają kluczową rolę w procesie krzepnięcia.',
    unit: 'G/l'
  },
  mpv: {
    description: '(z ang. Mean Platelet Volume) jest jednym z wielu współczynników morfologii krwi. Badanie to daje nam wiedzę o wielkości wytwarzanych przez szpik kostny trombocytów, czyli płytek krwi. Pozwala rozpoznać nadpłytkowość lub małopłytkowość.',
    unit: 'fl'
  },
  neutrocyty: { 
    description: 'Neutrocyty nazywane są inaczej neutrofilami. To obojętnochłonne granulocyty, które przypominaja niewielkie kulki o średnicy nieprzekraczającej 13 mikrometrów. Stanowią jedną z najważniejszych części naszego układu odpornościowego. Potrafią w ciągu ułamków sekund reagować na obecność szkodliwych substancji.',
    unit: 'G/l'
  },
  limfocyty: {
    description: 'Limfocyty należą do grupy krwinek białych.  Stanowią podstawę odpowiedzi odpornościowej swoistej.  Są odpowiedzialne za obronę organizmu przed drobnoustrojami: bakteriami, wirusami i grzybami oraz uczestniczą w zwalczaniu komórek nowotworowych. Mają zdolność tworzenia przeciwciał, a ich nadmiar lub obniżona liczba świadczą o nieprawidłowym stanie organizmu. Co to są limfocyty i jakie pełnią funkcje w organizmie człowieka?',
    unit: 'G/l'
  },
  monocyty: {
    description: 'Monocyty we krwi to największe komórki krwi, zaliczane do agranulocytów. Ich głównym zadaniem jest regulowanie pracy układu immunologicznego. Produkowane są w szpiku kostnym z komórek macierzystych, po czym przedostają się do krwi i różnych narządów oraz układów naszego organizmu i w tkankach przeobrażają się w makrofagi.',
    unit: 'G/l'
  },
  eozynocyty: {
    description: 'Eozynocyty (EO) to typ białych krwinek, które tworzą tzw. granulocyty kwasochłonne. Uczestniczą w odpowiedzi immunologicznej organizmu i chronią go przed zakażeniem pasożytami oraz występowaniem reakcji alergicznych. Są one aktywowane w przypadku wystąpienia niektórych chorób alergicznych oraz infekcji.',
    unit: 'G/l'
  },
  bazocyty: {
    description: 'Bazocyty (bazofile, granulocyty zasadochłonne, BASO) to jedne z podstawowych komórek krwi, które odgrywają rolę w obronie organizmu i powstawaniu zapalenia w wyniku alergii. Zostały odnalezione pod koniec XIX wieku przez Paula Ehrlicha, jednak przez dłuższy czas nie przeprowadzano nad nimi dokładniejszych badań.',
    unit: 'G/l'
  },
  ig: {
    description: '(ang. Immature Granulocytes) - Obecność niedojrzałych granulocytów we krwi obwodowej wskazuje na odpowiedź na zakażenie, zapalenia lub inny czynnik stymulujący szpik kostny we wczesnym etapie u pacjentów w stanach ciężkich np. po rozległych urazach lub w podejrzeniu sepsy.',
    unit: 'G/l'
  }
}

const getValue = (IDName) => parseFloat(document.querySelector(IDName).value);
const clearResults = () => {
  DOM.elementPicker.value = '';
  DOM.userResult.value = '';
  DOM.referenceFrom.value = '';
  DOM.referenceTo.value = '';
}

const IDgenerator = (arr) => {
  let id;
  arr.length < 1 ? id = 0: id = arr[arr.length - 1].id + 1;
  return id;
}

DOM.addBtn.addEventListener('click', () => {
  const referenceFrom = getValue('#reference-from');
  const referenceTo = getValue('#reference-to');
  const result = getValue('#result');
  if (currTest >= 0 && DOM.elementPicker.value && referenceFrom && referenceTo && result) {
    const fullElementName = DOM.elementPicker.options[DOM.elementPicker.selectedIndex].text;
    const bloodElementID = IDgenerator(userBloodTests[currTest].elements);
    const newElement = {id: bloodElementID, name: fullElementName, res: result, refFrom: referenceFrom, refTo: referenceTo};
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

const addElementToUI = ({id, name, res, refFrom, refTo}) => {
  const elementPickerValue = DOM.elementPicker.value;
  const userCheck = userResultCheck(res, refFrom, refTo);
  const newElementHTML = `<div class="blood-element" id="blood-element-${id}"><div class="blood-element__element-name"><span>${name}</span><div class="query-box"><span>?</span><div class="details-popup">${bloodElements[elementPickerValue].description}</div></div></div><div class="blood-element__result ${userCheck === 'checkmark' ? 'user-pass' : 'user-fail'}"><span>${res}</span><svg class="icon-medium margin-left-small"><use xlink:href="img/sprites.svg#icon-${userCheck}"></use></svg></div><div class="blood-element__unit"><span>${bloodElements[elementPickerValue].unit}</span></div><div class="blood-element__reference"><span>${refFrom} - ${refTo}</span><div class="blood-element__delete-icon"><a id="btn-delete" title="Usuń składnik"><svg class="icon-medium delete-icon"><use xlink:href="img/sprites.svg#icon-close"></use></svg></a></div></div></div>`;
  DOM.elementsList.forEach(el => {
    el.insertAdjacentHTML('beforeend', newElementHTML);
  });
};

const removeElementFromUI = (IDName, i) => {
  const el = document.getElementById(`${IDName}${i}`);
  el.parentNode.removeChild(el);
}

const removeElementsFromUI = (i) => {
  const elements = qSelectAll(`#blood-element-${i}`);
  elements.forEach(el => el.parentNode.removeChild(el));
};

const clearUI = () => {
  DOM.elementsList.forEach(el => {
    el.innerHTML = '';
  });
}

const getIDNumber = (str) => {
  const IDnameArr = str.split('-');
  const id = parseInt(IDnameArr[2]);
  return id;
};

const deleteElement = (event) => {
  if (event.target.parentNode.classList.contains('delete-icon')) {
    const ElIDnameStr = event.target.closest('.blood-element').id;
    if(ElIDnameStr) {
      const id = getIDNumber(ElIDnameStr);
      const index = userBloodTests[currTest].elements.findIndex(obj => obj.id === id);
      if (index !== -1) {
        userBloodTests[currTest].elements.splice(index, 1);
        removeElementFromUI('blood-element-', index);
        // removeElementsFromUI(index);
      }
    }
  }
}

DOM.elementsList.forEach(el => {
  el.addEventListener('click', deleteElement);
});

const updateTestsList = ({id, date, location}) => {
  if (userBloodTests.length < 1) {
   DOM.noTestsBox.style.display = 'block';
 } else {
  DOM.noTestsBox.style.display = 'none';
    const [year, month, day] = date.split('-');
    const newTestHTML = `<div class="user-tests__item" id="user-test-${id}"><span class="red-label">${id + 1}.</span><span>Badanie z dnia ${day}-${month}-${year}, w ${location}</span><button class="btn-round btn-round--small margin-left-small" id="btn-options" title="Pokaż opcje"><svg class="icon-medium icon-grey margin-top-small"><use xlink:href="img/sprites2.svg#icon-menu"></use></svg></button><div class="user-tests__options"><button id="btn-open-test" class="btn-round btn-round--big margin-right-medium" title="Otwórz badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites.svg#icon-launch"></use></svg></button><button id="btn-download-test" class="btn-round btn-round--big margin-right-medium" title="Pobierz badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites1.svg#icon-save_alt"></use></svg></button><button id="btn-delete-test" class="btn-round btn-round--big margin-right-medium" title="Usuń badanie"><svg class="icon-big icon-grey"><use xlink:href="img/sprites1.svg#icon-trash-2"></use></svg></button><button id="btn-return" class="btn-round btn-round--big" title="Powrót"><svg class="icon-big icon-grey"><use xlink:href="img/sprites2.svg#icon-corner-down-left"></use></svg></button></div></div>`;
    DOM.userTests.insertAdjacentHTML('beforeend', newTestHTML);
 }
}

const clearTest = () => {
  DOM.datePicker.value = '';
  DOM.testLocation.value = '';
};

DOM.addAnotherTestBtn.addEventListener('click', () => { 
  clearTest();
  clearUI();
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
  e.target.parentNode.parentNode.id === 'btn-return') {
    const el = document.querySelector(`#user-test-${id} .user-tests__options`);
    el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
  }
};

const openTest = (e, id) => {
  if (e.target.parentNode.parentNode.id === 'btn-open-test') {
    currTest = id;
    DOM.datePicker.value = userBloodTests[id].date;
    DOM.testLocation.value = userBloodTests[id].location;
    clearUI();
    userBloodTests[id].elements.forEach(el => addElementToUI(el));
  }
}

document.addEventListener('click', (e) => {
  console.log(e.target);
})

// const downloadTest = (id) => {
//     const el = document.querySelector(`#user-test-${id} #btn-download-test`);
//     el.addEventListener('click', () => {
//       console.log('Button download');
//     });
// }

// const deleteTest = (id) => {
//     const el = document.querySelector(`#user-test-${id} #btn-delete-test`);
//     el.addEventListener('click', () => {
//       console.log('Button delete');
//     });
// }

DOM.userTests.addEventListener('click', (event) => {
  if (userBloodTests.length > 0) {
    const testIDnameStr = event.target.closest('.user-tests__item').id;
    const testID = getIDNumber(testIDnameStr);
    userTestOptionsDisplayToggle(event, testID);
    openTest(event, testID);
    //userTestOptions(event, testID);
  }
});

// document.querySelector('.btn-test').addEventListener('click', () => {
//   const el = document.querySelector('.user-analysis');
//   html2pdf(el);
// });