import Roles from "../models/Roles.js";
import Users from "../models/Users.js";

import bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const superAdminRole = await Roles.findOne({ roleName: "superadmin" });
    if (!superAdminRole) return;

    const exists = await Users.findOne({ email: process.env.SUPERADMIN_EMAIL });
    if (exists) {
      console.log("ℹ️ SuperAdmin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10
    );

    await Users.create({
      username: "superadmin", 
      email: process.env.SUPERADMIN_EMAIL,
      password: hashedPassword,
      address:"lahore",
      roles: [superAdminRole._id], 
    });

    console.log(" SuperAdmin created");
  } catch (error) {
    console.error(" SuperAdmin seeding failed:", error.message);
  }
};
export default seedSuperAdmin