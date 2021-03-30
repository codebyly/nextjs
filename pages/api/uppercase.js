export default function (req, res) {
  console.log(req); //ausgabe im intenren terminal/konsole

  console.log(req.query);
  const { text = "" } = req.query;
  const bigText = text.toUpperCase();
  res.status(200).json({ bigText }); //Rückgabewert?
}
