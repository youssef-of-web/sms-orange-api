var express = require("express");
var router = express.Router();
const axios = require("axios");

const genToken = async () => {
  const result = await axios
    .post(
      "https://api.orange.com/oauth/v3/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: process.env.TOKEN_AUTH,
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => res.data);
  return result.access_token;
};
/* GET home page. */
router.post("/sms", async function (req, res, next) {
  const token = await genToken();
  const devPhoneNumber = process.env.NUMBER_DEV;
  const recipient = req.body.number;
  const message = req.body.message;
  axios
    .post(
      `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${devPhoneNumber}/requests`,
      {
        outboundSMSMessageRequest: {
          address: `tel:+216${recipient}`,
          senderAddress: `tel:+${devPhoneNumber}`,
          outboundSMSTextMessage: {
            message: message,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    .then((result) => res.send("success"))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send(err.response.data.requestError.serviceException.variables);
    });
});

module.exports = router;
