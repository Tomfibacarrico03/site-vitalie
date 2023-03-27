const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.SaveJob = functions.https.onCall(async (data, context) => {
  try {
    const { headline, description, tradeSelected, selectedCategory, selectedSubCategory, location } = data;
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
    
    });

    console.log("Document has been added successfully");
    return "Document Added";
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});

exports.createUserAndSaveJob = functions.https.onCall(async (data, context) => {
    const { email, password, firstName, lastName, username, phone, postalCode, headline, description } = data;
  
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to create a new user.');
    }
  
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password
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
        role: 'home-owner'
      });
  
      await db.collection("jobs").add({
        headline,
        description,
        userId: userRecord.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      return { message: 'User created successfully and job saved!' };
    } catch (error) {
      throw new functions.https.HttpsError('unknown', error.message);
    }
  });


