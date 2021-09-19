import { ElementData } from "../../types/interfaces";

export const bloodElements: ElementData = {
  leukocyty: {
    name: "Leukocyty [C30]",
    description:
      "Elementy morfotyczne krwi. Są niemal bezbarwne i mniej liczne od erytrocytów, posiadają zdolność ruchu. Żyją od kilku dni (granulocyty) nawet do 20 lat (limfocyty B pamięci immunologicznej). Ich zadaniem jest ochrona organizmu przed patogenami, takimi jak wirusy i bakterie. Wszystkie leukocyty wykazują ekspresję cząsteczki CD45.",
    unit: "G/l",
  },
  erytrocyty: {
    name: "Erytrocyty [C02]",
    description:
      "Krwinka czerwona, czerwone ciałko krwi – morfotyczny składnik krwi, którego głównym zadaniem jest przenoszenie tlenu z płuc do pozostałych tkanek organizmu.",
    unit: "T/l",
  },
  hemoglobina: {
    name: "Hemoglobina",
    description:
      "Czerwony barwnik krwi, białko zawarte w erytrocytach, którego zasadniczą funkcją jest transportowanie tlenu – przyłączanie go w płucach i uwalnianie w tkankach. Mutacje genu hemoglobiny prowadzą do chorób dziedzicznych: anemii sierpowatej, talasemii lub rzadkich chorób zwanych hemoglobinopatiami.",
    unit: "g/dl",
  },
  hematokryt: {
    name: "Hematokryt",
    description: "Stosunek objętości erytrocytów do objętości pełnej krwi.",
    unit: "%",
  },
  mcv: {
    name: "MCV",
    description:
      "(z ang. Mean Corpuscular Volume) - Średnia objętość krwinki czerwonej. Znajdująca się w nich hemoglobina odpowiedzialna jest za transport tlenu do komórek, natomiast odpowiednia ilość tlenu potrzebna jest do poprawnego funkcjonowania naszego organizmu. Zatem parametr MCV wyraża ilość zawartego w organizmie badanego hematokrytu oraz ilość krwinek czerwonych.",
    unit: "fl",
  },
  mch: {
    name: "MCH",
    description:
      "(z ang. Mean Corpuscular Hemoglobin) to średnia waga hemoglobiny w czerwonej krwince. Średnia ta otrzymywana jest z podzielenia stężenia hemoglobiny przez liczbę erytrocytów.",
    unit: "pg",
  },
  mchc: {
    name: "MCHC",
    description:
      "Jest jednym z parametrów oznaczanych podczas morfologii krwi. Jest to wskaźnik określający średnie stężenie hemoglobiny w erytrocytach, czyli czerwonych krwinkach. Poziom MCHC mówi wiele o zdrowiu człowieka. Podwyższone poziom tego wskaźnika może świadczyć o odwodnieniu, a obniżony o anemii.",
    unit: "g/dl",
  },
  rdw: {
    name: "RDW",
    description:
      "To wskaźnik rozkładu objętości erytrocytów (czerwonych krwinek). Wskaźnik ten ocenia różnice w wielkości poszczególnych krwinek czerwonych.",
    unit: "%",
  },
  plytkikrwi: {
    name: "Płytki krwi [C66]",
    description:
      "Trombocyty, inaczej płytki krwi bądź krwinki płytkowe, to obok białych i czerwonych krwinek elementy morfotyczne krwi. Płytki krwi odgrywają kluczową rolę w procesie krzepnięcia.",
    unit: "G/l",
  },
  mpv: {
    name: "MPV",
    description:
      "(z ang. Mean Platelet Volume) jest jednym z wielu współczynników morfologii krwi. Badanie to daje nam wiedzę o wielkości wytwarzanych przez szpik kostny trombocytów, czyli płytek krwi. Pozwala rozpoznać nadpłytkowość lub małopłytkowość.",
    unit: "fl",
  },
  neutrocyty: {
    name: "Neutrocyty",
    description:
      "Neutrocyty nazywane są inaczej neutrofilami. To obojętnochłonne granulocyty, które przypominaja niewielkie kulki o średnicy nieprzekraczającej 13 mikrometrów. Stanowią jedną z najważniejszych części naszego układu odpornościowego. Potrafią w ciągu ułamków sekund reagować na obecność szkodliwych substancji.",
    unit: "G/l",
  },
  limfocyty: {
    name: "Limfocyty",
    description:
      "Limfocyty należą do grupy krwinek białych.  Stanowią podstawę odpowiedzi odpornościowej swoistej.  Są odpowiedzialne za obronę organizmu przed drobnoustrojami: bakteriami, wirusami i grzybami oraz uczestniczą w zwalczaniu komórek nowotworowych. Mają zdolność tworzenia przeciwciał, a ich nadmiar lub obniżona liczba świadczą o nieprawidłowym stanie organizmu. Co to są limfocyty i jakie pełnią funkcje w organizmie człowieka?",
    unit: "G/l",
  },
  monocyty: {
    name: "Monocyty",
    description:
      "Monocyty we krwi to największe komórki krwi, zaliczane do agranulocytów. Ich głównym zadaniem jest regulowanie pracy układu immunologicznego. Produkowane są w szpiku kostnym z komórek macierzystych, po czym przedostają się do krwi i różnych narządów oraz układów naszego organizmu i w tkankach przeobrażają się w makrofagi.",
    unit: "G/l",
  },
  eozynocyty: {
    name: "Eozynocyty",
    description:
      "Eozynocyty (EO) to typ białych krwinek, które tworzą tzw. granulocyty kwasochłonne. Uczestniczą w odpowiedzi immunologicznej organizmu i chronią go przed zakażeniem pasożytami oraz występowaniem reakcji alergicznych. Są one aktywowane w przypadku wystąpienia niektórych chorób alergicznych oraz infekcji.",
    unit: "G/l",
  },
  bazocyty: {
    name: "Bazocyty",
    description:
      "Bazocyty (bazofile, granulocyty zasadochłonne, BASO) to jedne z podstawowych komórek krwi, które odgrywają rolę w obronie organizmu i powstawaniu zapalenia w wyniku alergii. Zostały odnalezione pod koniec XIX wieku przez Paula Ehrlicha, jednak przez dłuższy czas nie przeprowadzano nad nimi dokładniejszych badań.",
    unit: "G/l",
  },
  ig: {
    name: "IG",
    description:
      "(ang. Immature Granulocytes) - Obecność niedojrzałych granulocytów we krwi obwodowej wskazuje na odpowiedź na zakażenie, zapalenia lub inny czynnik stymulujący szpik kostny we wczesnym etapie u pacjentów w stanach ciężkich np. po rozległych urazach lub w podejrzeniu sepsy.",
    unit: "G/l",
  },
};
