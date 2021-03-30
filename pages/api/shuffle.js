export default function (req, res) {
  console.log(req); //ausgabe im intenren terminal/konsole

  console.log(req.query);
  const { text = "" } = req.query;
  const bigText = text.toUpperCase();
  const littleText = text.toLowerCase();
  const hallo = `Hallo, ${text}!`;
  const shuffled = shuffle(text);
  res.status(200).json({ text, bigText, littleText, hallo, shuffled }); //Rückgabewert?
}

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
