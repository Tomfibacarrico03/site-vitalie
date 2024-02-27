const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const db = admin.firestore();
const fetch = require("node-fetch");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: "afonsoresendes03@gmail.com",
    pass: "awhvwwkxiaqlduyd",
  },
});

exports.SaveJob = functions.https.onCall(async (data, context) => {
  try {
    const {
      headline,
      description,
      tradeSelected,
      selectedCategory,
      selectedSubCategory,
      location,
      interestedUsers,
      rejectedUsers,
      shortlistedUsers,
    } = data;
    const userId = context.auth.uid;
    const jobsRef = db.collection("jobs");

    await jobsRef.add({
      headline,
      description,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      tradeSelected,
      selectedCategory,
      selectedSubCategory,
      location,
      interestedUsers,
      rejectedUsers,
      shortlistedUsers,
    });

    console.log("Document has been added successfully");
    return "Document Added";
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

exports.sendEmail = functions.https.onCall((data, context) => {
  const { email, type } = data;

  const mailOptions = {
    from: "afonsoresendes03@gmail.com", // This should match the email used in the transporter
    to: email,
    subject: "MeuJob.pt",
    text: `Registo de ${type == "homeowner" ? "contratante" : "trabalhador"
      } feito com sucesso`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        resolve("Email sent successfully");
      }
    });
  });
});

exports.createUserAndSaveJob = functions.https.onCall(async (data, context) => {
  const {
    email,
    password,
    firstName,
    lastName,
    username,
    phone,
    postalCode,
    headline,
    description,
  } = data;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to create a new user."
    );
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await db.collection("users").doc(userRecord.uid).set({
      firstName,
      lastName,
      username,
      email,
      phone,
      address1: "",
      address2: "",
      city: "",
      postalCode,
      role: "home-owner",
    });

    await db.collection("jobs").add({
      headline,
      description,
      userId: userRecord.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: "User created successfully and job saved!" };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

exports.requestCIT = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    console.error("Missing or invalid userId in query parameters");
    res.status(400).send("Bad Request");
    return;
  }

  console.log("Fetching user data for userId:", userId);

  try {
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    if (!userSnapshot.exists) {
      console.error("User document not found:", userId);
      res.status(404).send("User Not Found");
      return;
    }
    const userData = userSnapshot.data();

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    ); // Allow the Authorization header

    // Check if it's a preflight request and respond immediately
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const apiUrl = "https://spg.qly.site1.sibs.pt/api/v2/payments"; // Replace with the API endpoint URL

      const raw = JSON.stringify({
        merchant: {
          terminalId: 59172,
          channel: "web",
          merchantTransactionId: "teste 12345",
        },
        transaction: {
          transactionTimestamp: new Date().toISOString(),
          description: "TesteUnicre",
          moto: false,
          paymentType: "AUTH",
          amount: {
            value: 0,
            currency: "EUR",
          },
          paymentMethod: ["CARD"],
        },
        customer: {
          customerInfo: {
            customerName: userData.firstName + " " + userData.lastName,
            customerEmail: userData.email,
            billingAddress: {
              street1: userData.address1,
              city: userData.city,
              postcode: userData.postalCode,
              country: "PT",
            },
          },
        },
        merchantInitiatedTransaction: {
          type: "UCOF",
          amountQualifier: "ESTIMATED",
        },

      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IBM-Client-Id": "ab802d80-cefe-4622-9a98-774118372d57",
          Authorization:
            "Bearer 0276b80f950fb446c6addaccd121abfbbb.eyJlIjoiMjAwNDg2MTkxNjU0MCIsInJvbGVzIjoiU1BHX01BTkFHRVIiLCJ0b2tlbkFwcERhdGEiOiJ7XCJtY1wiOlwiNTA0OTM4XCIsXCJ0Y1wiOlwiNTkxNzJcIn0iLCJpIjoiMTY4OTI0MjcxNjU0MCIsImlzIjoiaHR0cHM6Ly9xbHkuc2l0ZTEuc3NvLnN5cy5zaWJzLnB0L2F1dGgvcmVhbG1zL1FMWS5NRVJDSC5QT1JUMSIsInR5cCI6IkJlYXJlciIsImlkIjoiN2RId1VHdDFjUGI1YTZiYzk1Y2I2MTQ0NzlhZGRiMjZhMTdlMmRkZDQyIn0=.d6aad399a9bf30c3153c541ae98b7c38d3707efdcbd2f8e830566f897d3aac7be8da5653512cde4cb87b425a08796022a0183c3bd536a91d3cd70f077baf308d", // Replace with your actual access token
        },
        body: raw,
        redirect: "follow",
      };
      // Add a try-catch block around the API response logging
      try {
        const response = await fetch(apiUrl, requestOptions);
        const responseData = {
          data: {
            message: "POST done",
            result: await response.text(),
          },
        };
        console.log("API Response:", responseData);
        res.status(200).json(responseData);
      } catch (error) {
        console.error("Error while handling API response:", error);
        res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      console.error("POST request error:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send("Internal Server Error");
  }
});

exports.statusTransaction = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId;
  const transactionId = req.query.transactionId;

  if (!userId) {
    console.error("Missing or invalid userId in query parameters");
    res.status(400).send("Bad Request");
    return;
  }

  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );

    // Check if it's a preflight request and respond immediately
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const paymentRef = db.collection('payments').doc(transactionId);
      const paymentDoc = await paymentRef.get();


      const apiUrl = "https://spg.qly.site1.sibs.pt/api/v2/payments/";

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-IBM-Client-Id": "ab802d80-cefe-4622-9a98-774118372d57",
          Authorization:
            "Bearer 0276b80f950fb446c6addaccd121abfbbb.eyJlIjoiMjAwNDg2MTkxNjU0MCIsInJvbGVzIjoiU1BHX01BTkFHRVIiLCJ0b2tlbkFwcERhdGEiOiJ7XCJtY1wiOlwiNTA0OTM4XCIsXCJ0Y1wiOlwiNTkxNzJcIn0iLCJpIjoiMTY4OTI0MjcxNjU0MCIsImlzIjoiaHR0cHM6Ly9xbHkuc2l0ZTEuc3NvLnN5cy5zaWJzLnB0L2F1dGgvcmVhbG1zL1FMWS5NRVJDSC5QT1JUMSIsInR5cCI6IkJlYXJlciIsImlkIjoiN2RId1VHdDFjUGI1YTZiYzk1Y2I2MTQ0NzlhZGRiMjZhMTdlMmRkZDQyIn0=.d6aad399a9bf30c3153c541ae98b7c38d3707efdcbd2f8e830566f897d3aac7be8da5653512cde4cb87b425a08796022a0183c3bd536a91d3cd70f077baf308d", // Replace with your actual access token
        },
        redirect: "follow",
      };
      const response = await fetch(apiUrl + transactionId + "/status", requestOptions)
      const fetchResponse = JSON.parse(await response.text());
      const responseData = {
        userId: userId,
        active: true,
        paymentType: fetchResponse.paymentType,
        paymentStatus: fetchResponse.paymentStatus,
        paymentMethod: fetchResponse.paymentMethod,
        token: fetchResponse.token,
        execution: fetchResponse.execution,
      };
      console.log("Payment Status: " + responseData.paymentStatus);
      if (responseData.paymentStatus == "Success") {
        await paymentRef.set(responseData);
        res.status(200).json(responseData);
        if (!paymentDoc.exists) {


          const querySnapshot = await db.collection('payments').where('userId', '==', userId).get();

          const batch = db.batch();

          querySnapshot.forEach((doc) => {
            if (doc.id !== transactionId) {
              const docRef = db.collection('payments').doc(doc.id);
              batch.update(docRef, { active: false });
            }
          });

          await batch.commit();
        }
      } else {
        const responseData = {
          paymentStatus: "Declined",
        };

        res.status(200).json(responseData);
      }



    } catch (error) {
      console.error("GET request error:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send("Internal Server Error");
  }
});

exports.executePayment = functions.https.onRequest(async (req, res) => {

  const userId = req.query.userId;
  const tradeSelected = req.query.tradeSelected;
  const selectedCategory = req.query.selectedCategory;

  if (!userId) {
    console.error("Missing or invalid userId in query parameters");
    res.status(400).send("Bad Request");
    return;
  }

  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );

    // Check if it's a preflight request and respond immediately
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const querySnapshotValue = await db.collection('taxas').get();
      var dataVal = null;
      const docVal = querySnapshotValue.forEach((doc) => { dataVal = doc.data() });
      const value = dataVal[tradeSelected][selectedCategory];
      const querySnapshot = await db.collection('payments').where('userId', '==', userId).get();
      var transactionId = null;
      querySnapshot.forEach((doc) => {
        if (doc.data().active) {
          transactionId = doc.id;
        }
      });
      console.log("transactionId: " + transactionId);
      var raw = JSON.stringify({
        "merchant": {
          "terminalId": 59172,
          "channel": "web",
          "merchantTransactionId": "5351136"
        },
        "transaction": {
          "transactionTimestamp": new Date().toISOString(),
          "description": "Transaction short description",
          "amount": {
            "value": value,
            "currency": "EUR"
          },
          "originalTransaction": {
            "id": transactionId,
            "datetime": "2023-08-22T15:09:16.102Z"
          }
        }
      });

      const apiUrl = "https://spg.qly.site1.sibs.pt/api/v2/payments/";

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IBM-Client-Id": "ab802d80-cefe-4622-9a98-774118372d57",
          Authorization:
            "Bearer 0276b80f950fb446c6addaccd121abfbbb.eyJlIjoiMjAwNDg2MTkxNjU0MCIsInJvbGVzIjoiU1BHX01BTkFHRVIiLCJ0b2tlbkFwcERhdGEiOiJ7XCJtY1wiOlwiNTA0OTM4XCIsXCJ0Y1wiOlwiNTkxNzJcIn0iLCJpIjoiMTY4OTI0MjcxNjU0MCIsImlzIjoiaHR0cHM6Ly9xbHkuc2l0ZTEuc3NvLnN5cy5zaWJzLnB0L2F1dGgvcmVhbG1zL1FMWS5NRVJDSC5QT1JUMSIsInR5cCI6IkJlYXJlciIsImlkIjoiN2RId1VHdDFjUGI1YTZiYzk1Y2I2MTQ0NzlhZGRiMjZhMTdlMmRkZDQyIn0=.d6aad399a9bf30c3153c541ae98b7c38d3707efdcbd2f8e830566f897d3aac7be8da5653512cde4cb87b425a08796022a0183c3bd536a91d3cd70f077baf308d", // Replace with your actual access token
        },
        body: raw,
        redirect: "follow",
      };
      const response = await fetch("https://spg.qly.site1.sibs.pt/api/v2/payments/" + transactionId + "/mit", requestOptions)
      const fetchResponse = JSON.parse(await response.text());
      const responseData = {
        userId: userId,
        result: fetchResponse,
      };

      res.status(200).json(responseData);


    } catch (error) {
      console.error("POST request error:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send("Internal Server Error");
  }
});

exports.executePaymentCapture = functions.https.onRequest(async (req, res) => {

  const userId = req.query.userId;
  const tradeSelected = req.query.tradeSelected;
  const selectedCategory = req.query.selectedCategory;

  if (!userId) {
    console.error("Missing or invalid userId in query parameters");
    res.status(400).send("Bad Request");
    return;
  }

  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );

    // Check if it's a preflight request and respond immediately
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const querySnapshotValue = await db.collection('taxas').get();
      var dataVal = null;
      const docVal = querySnapshotValue.forEach((doc) => { dataVal = doc.data() });
      const value = dataVal[tradeSelected][selectedCategory];
      const querySnapshot = await db.collection('payments').where('userId', '==', userId).get();
      var transactionId = null;

      querySnapshot.forEach((doc) => {
        if (doc.data().active) {
          transactionId = doc.id;
        }
      }); 

      var raw = JSON.stringify({
        "merchant": {
          "terminalId": 59172,
          "channel": "web",
          "merchantTransactionId": "5351136"
        },
        "transaction": {
          "transactionTimestamp": new Date().toISOString(),
          "description": "Transaction short description",
          "amount": {
            "value": value,
            "currency": "EUR"
          }
        }
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IBM-Client-Id": "ab802d80-cefe-4622-9a98-774118372d57",
          Authorization:
            "Bearer 0276b80f950fb446c6addaccd121abfbbb.eyJlIjoiMjAwNDg2MTkxNjU0MCIsInJvbGVzIjoiU1BHX01BTkFHRVIiLCJ0b2tlbkFwcERhdGEiOiJ7XCJtY1wiOlwiNTA0OTM4XCIsXCJ0Y1wiOlwiNTkxNzJcIn0iLCJpIjoiMTY4OTI0MjcxNjU0MCIsImlzIjoiaHR0cHM6Ly9xbHkuc2l0ZTEuc3NvLnN5cy5zaWJzLnB0L2F1dGgvcmVhbG1zL1FMWS5NRVJDSC5QT1JUMSIsInR5cCI6IkJlYXJlciIsImlkIjoiN2RId1VHdDFjUGI1YTZiYzk1Y2I2MTQ0NzlhZGRiMjZhMTdlMmRkZDQyIn0=.d6aad399a9bf30c3153c541ae98b7c38d3707efdcbd2f8e830566f897d3aac7be8da5653512cde4cb87b425a08796022a0183c3bd536a91d3cd70f077baf308d", // Replace with your actual access token
        },
        body: raw,
        redirect: "follow",
      };
      const response = await fetch("https://spg.qly.site1.sibs.pt/api/v2/payments/" + transactionId + "/capture", requestOptions)
      const fetchResponse = JSON.parse(await response.text());
      const responseData = {
        userId: userId,
        result: fetchResponse,
      };

      res.status(200).json(responseData);


    } catch (error) {
      console.error("POST request error:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send("Internal Server Error");
  }
});