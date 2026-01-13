import Roles from "../models/Roles.js";

const roles = [
  { roleName: "superadmin", description: "Full system access" },
  { roleName: "admin", description: "Manage platform" },
  { roleName: "seller", description: "Sell products" },
  { roleName: "buyer", description: "Buy products" }
];

const seedRoles = async () => {
  try {
    for (const role of roles) {
      await Roles.updateOne(
        { roleName: role.roleName },
        { $setOnInsert: role },
        { upsert: true }
      );
    }

    console.log(" Roles seeded successfully");
  } catch (error) {
    console.error(" Role seeding failed:", error.message);
  }
};

export default seedRoles