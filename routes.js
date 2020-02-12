const router = require("express").Router();

const User = require("./schema").User;
const Subscription = require("./schema").Subscription;

let stripe = require('stripe')('sk_test_gY7JgcoVgEahKXOTdd4UQTy3007XKkxyXI');

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

router.post("/register", async (req, res) => {
  let user = new User({
    email: req.body.email,
    phone: req.body.mobile,
    name: req.body.name,
    cid: '',
    pmid: '',
    password: req.body.password
  });
  await user.save().then(() => {
    res.send("done");
  });
});

router.post("/login", async (req, res) => {
  let user = await User.find({
    email: req.body.email,
    password: req.body.password
  });
  if (user.length)
    res.send({ id: user[0]._id });
  else res.send("false");
})


router.get('/get-cust', async (req, res) => {
  stripe.customers.retrieve(
    'cus_GiMI8GRULTuCSD',
    function (err, customer) {
      res.send(customer);
    }
  );
})


router.post("/create-customer", async (req, res) => {
  let id = JSON.parse(req.body.id).id;
  let user = await User.find({
    _id: id,
  });

  const customer = await stripe.customers.create({
    payment_method: req.body.payment_method,
    email: user[0].email,
    name: user[0].name,
    invoice_settings: {
      default_payment_method: req.body.payment_method,
    },
  });

  await User.updateOne(
    {
      _id: id
    },
    {
      $set: {
        cid: customer.id,
        pmid: req.body.payment_method
      }
    },
    async err => {
      if (err) throw err;
      else {
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ plan: req.body.plan }],
          expand: ["latest_invoice.payment_intent"]
        });
        let sus = new Subscription({
          id: id,
          status: 'pending',
          plan: req.body.plan
        });
        await sus.save().then(() => {
          res.send("done");
        });
      }
    })
});

router.post('/get-sub', async (req, res) => {
  let id = JSON.parse(req.body.id).id;
  Subscription.find({ id: id }).then((data) => {
    if (data.length) {
      let d = {};
      d.status = data[0].status;
      d.plan = data[0].plan;
      res.send(d);
    }
    else res.send("no");
  })
})
module.exports = router;
