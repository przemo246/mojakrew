import { FunctionComponent } from "react";
import { Element } from "../../../types/interfaces";
import {
  Page,
  Text,
  Document,
  Image,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import logo from "../../assets/img/logo1x.png";

interface TestPDFProps {
  elements: Element[];
  date: string | number;
  location: string;
}

const styles = StyleSheet.create({
  image: {
    width: "180px",
    marginVertical: 15,
    marginHorizontal: 170,
  },
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    textAlign: "center",
    fontSize: "12px",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginBottom: 10,
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

export const TestPDF: FunctionComponent<TestPDFProps> = ({
  elements,
  date,
  location,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.image} src={logo} />
        <Text>
          Badanie z dnia {date} wykonane w {location}.
        </Text>
        <View style={styles.section}>
          {elements.map((el) => {
            return (
              <Text style={styles.text}>
                {el.name} - wynik:{" "}
                {el.result >= el.referenceFrom &&
                el.result <= el.referenceTo ? (
                  <Text style={{ color: "#00910e" }}>{el.result}</Text>
                ) : (
                  <Text style={{ color: "#d10000" }}>{el.result}</Text>
                )}{" "}
                - wartość referencyjna od {el.referenceFrom} do {el.referenceTo}
              </Text>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
