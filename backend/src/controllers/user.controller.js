import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { User } from "../models/user.model.js";

import crypto from "crypto";

const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please Provide" })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }


        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
        }

    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` })
    }
}


const register = async (req, res) => {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
        return res.status(400).json({ message: "All fields (name, username, email, password) are required." });
    }

    try {
        const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(httpStatus.FOUND).json({ message: "Username already exists" });
            }
            if (existingUser.email === email) {
                return res.status(httpStatus.FOUND).json({ message: "Email already exists" });
            }
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.status(500).json({ message: `Something went wrong: ${e.message || e}` });
    }
}

export { login, register };

