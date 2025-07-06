// functions/index.js

// Import the necessary Firebase modules.
// firebase-functions provides the API for creating Cloud Functions.
// firebase-admin provides access to Firebase services like Firestore with admin privileges.
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // Import and configure CORS middleware

// Initialize the Firebase Admin SDK.
// This allows the function to securely interact with other Firebase services.
// initializeApp() is called with no arguments, so it automatically uses
// the project's default configuration when deployed.
admin.initializeApp();

// Get a reference to the Firestore database.
const db = admin.firestore();

/**
 * A Cloud Function to create a new service order.
 * Triggered by an HTTP POST request.
 */
exports.createOrder = functions.https.onRequest((req, res) => {
  // Handle CORS preflight requests and set headers for the actual request.
  // This is crucial for allowing your Vercel-hosted frontend to call this function.
  cors(req, res, () => {
    // 1. Ensure the request is a POST request.
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
      const data = req.body;

      // 2. Validate the incoming data.
      // Ensure all required fields are present in the request body.
      const requiredFields = ["clientId", "serviceType", "location", "preferredDate"];
      const missingFields = requiredFields.filter(field => !data[field]);

      if (missingFields.length > 0) {
        // If any required fields are missing, return a 400 Bad Request error.
        return res.status(400).send({
          error: `Missing required fields: ${missingFields.join(", ")}`
        });
      }

      // 3. Prepare the data for Firestore.
      const orderData = {
        clientId: data.clientId,
        serviceType: data.serviceType,
        location: data.location,
        // Convert the ISO date string from the client into a native Firestore Timestamp.
        preferredDate: admin.firestore.Timestamp.fromDate(new Date(data.preferredDate)),
        // Include optional notes if provided.
        additionalNotes: data.additionalNotes || null,
        // Set the initial status and creation timestamp.
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // 4. Add the new document to the 'orders' collection.
      db.collection("orders").add(orderData)
        .then(docRef => {
          // 5. Return a success response with the new document's ID.
          console.log("Successfully created order with ID:", docRef.id);
          return res.status(200).send({
            success: true,
            orderId: docRef.id
          });
        })
        .catch(dbError => {
          // Handle any errors from Firestore.
          console.error("Error writing to Firestore:", dbError);
          return res.status(500).send({
            error: "Failed to create order in database."
          });
        });

    } catch (e) {
      // Handle any other unexpected errors (e.g., JSON parsing).
      console.error("Internal Server Error:", e);
      res.status(500).send({ error: "An internal server error occurred." });
    }
  });
});
