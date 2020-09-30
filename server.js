const app = require("express")();
const stripe = require("stripe")("sk_test_cUcNeDn4hxm24SuYkmqamgaF00fkz5ypoo");
app.use(require("body-parser").text());
console.log('aa');
app.post("/charge", async (req, res) => {
  token=req.body.split(',')[0];
  price=req.body.split(',')[1];
  try {
    let { status } = await stripe.charges.create({
      amount: price*100,
      currency: "EUR",
      description: "An example charge",
      source: token
    });
    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
  console.log("a");
});
app.listen(9000, () => console.log("Listening on port 9000"));