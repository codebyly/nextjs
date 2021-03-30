import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function Shuffle() {
  const [eingabe, setEingabe] = useState("");
  const [bigText, setBigText] = useState("");

  const [klein, setKlein] = useState("");
  const [hallo, setHallo] = useState("");
  const [shuffled, setShuffled] = useState("");

  const debouncedText = useDebouncedValue(eingabe, 300);
  //   console.log(eingabe);

  useEffect(() => {
    async function fetchBigText() {
      try {
        const response = await fetch(`/api/shuffle?text=${eingabe}`); //auslesen der API zum suchbegriff eingabe

        if (!response.ok) {
          throw new Error("Fehlermeldung");
        }
        // console.log(bigText);
        const ausgabeData = await response.json();

        setBigText(ausgabeData.bigText);
        setKlein(ausgabeData.littleText);
        setHallo(ausgabeData.hallo);
        setShuffled(ausgabeData.shuffled);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBigText();
  }, [debouncedText]); //useEffect ausführen bei Veränderung von eingaeb/debouncedText

  return (
    <Layout title="Shuffle">
      <label htmlFor="search"> Suchbegriff: </label>
      <input
        id="search"
        type="search"
        value={eingabe}
        onChange={(e) => setEingabe(e.target.value)}
      ></input>
      <hr />
      <div>
        <strong>alles gross: {bigText}</strong>
      </div>
      <hr />
      <div>
        <strong>alles Klein: {klein}</strong>
      </div>
      <hr />
      <div>
        <strong>{hallo}</strong>
      </div>
      <hr />
      <div>
        <strong>Shuffled: {shuffled}</strong>
      </div>
    </Layout>
  );
}

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
