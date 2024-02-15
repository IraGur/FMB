const User = require("./models/User");
const mongoose = require("mongoose");

mongoose.connect(
   "mongodb+srv://IraGur:dariko@cluster0.g4jlle6.mongodb.net/fmb_accenture",
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

const deleteAllUsers = async () => {
   try {
      await User.deleteMany({ isHR: false });
   } catch (err) {
      console.error("Error deleting users:", err.message);
   }
};

const officeAddress = {
   label: "Office",
   value: "Cantersteen - Kantersteen 12, 1000 Brussels, Belgium",
   lat: 50.845523,
   lng: 4.3575022,
};

const homeAddresses = [
   {
      label: "Home",
      value: "Avenue Marie-José - Marie-Josélaan 158, 1200 Woluwe-Saint-Lambert - Sint-Lambrechts-Woluwe, Belgium",
      lat: 50.8442667,
      lng: 4.406731,
   },
   {
      label: "Home",
      value: "Avenue des Bécassines - Watersneppenlaan 35, 1160 Auderghem - Oudergem, Belgium",
      lat: 50.8216976,
      lng: 4.4235789,
   },
   {
      label: "Home",
      value: "Dorpstraat 222, 3060 Bertem, Belgium",
      lat: 50.8620698,
      lng: 4.6267551,
   },
   {
      label: "Home",
      value: "Avenue du Grand Bois 26, 1410 Waterloo, Belgium",
      lat: 50.7100337,
      lng: 4.3866525,
   },
   {
      label: "Home",
      value: "Rue des Fontaines 17, 1300 Wavre, Belgium",
      lat: 50.7135655,
      lng: 4.6078366,
   },
   {
      label: "Home",
      value: "Rue du Fort - Fortstraat 117, 1060 Saint-Gilles - Sint-Gillis, Belgium",
      lat: 50.8266288,
      lng: 4.3404932,
   },
   {
      label: "Home",
      value: "Rue Bonaventure - Bonaventurestraat 2, 1090 Jette, Belgium",
      lat: 50.8852076,
      lng: 4.3183632,
   },
   {
      label: "Home",
      value: "Avenue de l'Héliport - Helihavenlaan 7, 1000 Brussels, Belgium",
      lat: 50.8582263,
      lng: 4.3510579,
   },
   {
      label: "Home",
      value: "Rue Stevin - Stevinstraat 36, 1000 Brussels, Belgium",
      lat: 50.8457785,
      lng: 4.376711,
   },
   {
      label: "Home",
      value: "Herbert Hooverplein 19, 3000 Leuven, Belgium",
      lat: 50.877358,
      lng: 4.7068564,
   },
];

// Function to seed users into the database
const seedUsers = async (numberOfUsers) => {
   try {
      for (let i = 0; i < numberOfUsers; i++) {
         const user = new User({
            firstName: generateRandomName(),
            lastName: generateRandomName(),
            addresses: [
               homeAddresses[i],
               officeAddress,
               { label: "Client", value: "" },
            ],
            email: generateRandomEmail(),
            password: "123456",
            role: generateRandomRole(),
            isHR: false, //generateRandomBoolean(),
         });

         await user.save();
      }

      console.log(`${numberOfUsers} users seeded successfully.`);
   } catch (error) {
      console.error("Error seeding users:", error.message);
   } finally {
      mongoose.connection.close();
   }
};

// Helper functions to generate random data
const generateRandomName = () => {
   const names = [
      "John",
      "Alice",
      "Bob",
      "Eva",
      "Chris",
      "Mia",
      "David",
      "Sophia",
      "Alex",
      "Olivia",
   ];
   return names[Math.floor(Math.random() * names.length)];
};

const generateRandomAddresses = () => {
   const labels = ["Home", "Office", "Client"];
   return labels.map((label) => ({
      label,
      value:
         label === "Client"
            ? ""
            : generateRandomName() + " St, " + generateRandomName(),
   }));
};

const generatedEmails = new Set();

const generateRandomEmail = () => {
   const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];

   let email;
   do {
      email = `${generateRandomName().toLowerCase()}@${
         domains[Math.floor(Math.random() * domains.length)]
      }`;
   } while (generatedEmails.has(email));

   // Add the generated email to the set
   generatedEmails.add(email);

   return email;
};

const generateRandomRole = () => {
   const professionRoles = [
      "HR",
      "IT Specialist",
      "Marketing",
      "Finance",
      "Sales",
      "Engineer",
   ];
   const randomIndex = Math.floor(Math.random() * professionRoles.length);
   return professionRoles[randomIndex];
};

const generateRandomBoolean = () => Math.random() > 0.5;

// Example: Seed 10 users
deleteAllUsers();
seedUsers(10);
