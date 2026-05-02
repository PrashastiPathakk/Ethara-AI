import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Task from "./models/task.js";
import Notice from "./models/notification.js";

dotenv.config();

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Clear existing data
        console.log("Clearing existing tasks, notifications, and users...");
        await Task.deleteMany({});
        await Notice.deleteMany({});
        await User.deleteMany({});

        // 2. Create Super Admin
        console.log("Creating Super Admin...");
        const superAdmin = await User.create({
            name: "Super Admin",
            email: "superadmin@taskmanager.com",
            password: "admin@123",
            isAdmin: true,
            role: "Super Admin",
            title: "Administrator",
            isActive: true
        });

        console.log("Super Admin created successfully:");
        console.log("Email: superadmin@taskmanager.com");
        console.log("Pass: admin@123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedSuperAdmin();
