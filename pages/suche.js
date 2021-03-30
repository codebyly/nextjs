import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
/* 
1. Erstellt eine Seite "Suche".
2. Auf der Seite soll ein Text-Eingabefeld sein, 
dessen Inhalt an die API /api/uppercase gesendet werden soll. = fetch-Anfrage!
adresse mit fetch anfragen

3. Die Antwort soll in einem strong-Element mit der Klasse
big-text angezeigt werden.


was will amn da shufflen?
shuffle sGD jS  codeschnipsel vanillajstoolkit, 30secondsofcode
strng>array mit split, join

*/

export default function Suche() {
  const [eingabe, setEingabe] = useState(""); //einageb
  const [ausgabe, setAusgabe] = useState(""); //rückageb in upperCase

  const debouncedText = useDebouncedValue(eingabe, 300);
  //verlangsamt Ausgabe: es wird cniht jedes Zeichen einzeln ausgegeben!, erst bei pause beim schreiben

  // console.log(eingabe);

  useEffect(() => {
    async function fetchSearch() {
      try {
        const response = await fetch(`/api/uppercase?text=${eingabe}`); //auslesen der API zum suchbegriff eingabe

        //Fehlermeldung
        if (!response.ok) {
          throw new Error("Fehler");
        }

        //response in json umwendlen: ausgabeData
        const ausgabeData = await response.json();
        console.log(ausgabeData); //Obj mit bigText string
        // console.log(ausgabeData.bigText);

        setAusgabe(ausgabeData.bigText);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSearch();
  }, [debouncedText, eingabe]); //abhg von textänderung: eingabe bzw debouncedText

  return (
    <Layout title="Suche">
      <label htmlFor="search">Text: </label>
      <input
        // id="search"
        // type="search"
        // value={eingabe}
        onChange={(e) => setEingabe(e.target.value)}
        // inhalt des Texteingabefeldes ändert sich
      />

      <strong className="big-text">{ausgabe}</strong>
    </Layout>
  );
}

//Jonathan . komplett s FTP
// import { useDebouncedValue } from "../hooks/useDebouncedValue";

// export default function Suche() {
//   const [text, setText] = useState("");
//   const [bigText, setBigText] = useState("");

//   const debouncedText = useDebouncedValue(text, 300);

//   useEffect(() => {
//     async function fetchBigText() {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/uppercase?text=${debouncedText}`
//         );

//         if (!response.ok) {
//           throw new Error("Netzwerkproblem!");
//         }

//         const bigTextData = await response.json();

//         setBigText(bigTextData.shuffledText);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchBigText();
//   }, [debouncedText]);

//   return (
//     <Layout title="Suche">
//       <label htmlFor="text">Text</label>{" "}
//       <input id="text" value={text} onChange={(e) => setText(e.target.value)} />
//       <strong className="big-text">{bigText}</strong>{" "}
//     </Layout>
//   );
// }
