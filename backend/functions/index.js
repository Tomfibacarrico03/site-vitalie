const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

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

exports.requestCIT = functions.https.onCall(async (data, context) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 0276b80f950fb446c6addaccd121abfbbb.eyJlIjoiMjAwNDg2MTkxNjU0MCIsInJvbGVzIjoiU1BHX01BTkFHRVIiLCJ0b2tlbkFwcERhdGEiOiJ7XCJtY1wiOlwiNTA0OTM4XCIsXCJ0Y1wiOlwiNTkxNzJcIn0iLCJpIjoiMTY4OTI0MjcxNjU0MCIsImlzIjoiaHR0cHM6Ly9xbHkuc2l0ZTEuc3NvLnN5cy5zaWJzLnB0L2F1dGgvcmVhbG1zL1FMWS5NRVJDSC5QT1JUMSIsInR5cCI6IkJlYXJlciIsImlkIjoiN2RId1VHdDFjUGI1YTZiYzk1Y2I2MTQ0NzlhZGRiMjZhMTdlMmRkZDQyIn0=.d6aad399a9bf30c3153c541ae98b7c38d3707efdcbd2f8e830566f897d3aac7be8da5653512cde4cb87b425a08796022a0183c3bd536a91d3cd70f077baf308d"
  );

  var raw = JSON.stringify({
    merchant: {
      terminalId: 59172,
      channel: "web",
      merchantTransactionId: "teste 12345",
    },
    transaction: {
      transactionTimestamp: "",
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
        customerName: "John Doe",
        customerEmail: "john.doe@xptomail.com",
        billingAddress: {
          street1: "First street",
          street2: "Menef Square",
          city: "Lisbon",
          postcode: "1700-123",
          country: "PT",
        },
      },
    },
    merchantInitiatedTransaction: {
      type: "UCOF",
      amountQualifier: "ESTIMATED",
    },
    tokenisation: {
      tokenisationRequest: {
        tokeniseCard: true,
      },
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://spg.qly.site1.sibs.pt/api/v2/payments", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});
