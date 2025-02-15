import User from "../models/userModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

// Inscription d'un utilisateur
async function register (req, res) {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(409).send("User already registered.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role: role });
        await user.save();

        const token = authMiddleware.generateAccessToken({ id: user._id, role: user.role });

        res.header("Authorization", token).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Connexion d'un utilisateur
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid email or password.");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid email or password.");

        const token = authMiddleware.generateAccessToken({ id: user._id, role: user.role });

        res.header("Authorization", token).send("Login successful");
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Récupération d'un utilisateur
async function getUser (req, res) {
    try {
        if (req.user.role !== "ADMIN") return res.status(403).send("Forbidden");
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).send("User not found");
        res.send(user);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Récupération de tous les utilisateurs
async function getAllUsers (req, res) {
    try {
        let users;
        if (req.user.role == "USER") {
            users = await User.find({ _id: req.user.id }).select("-password");
        } else {
            users = await User.find().select("-password");
        }
        if (!users) return res.status(404).send("Users not found");
        res.send(users);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Création d'un utilisateur
async function createUser (req, res) {
    try {
        if (req.user.role !== "ADMIN") return res.status(403).send("Forbidden");
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(409).send("User already registered.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role: role });

        await user.save();

        user = user.toObject()
        delete user.password;

        res.send(user);
    }
    catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
};

// Modification d'un utilisateur
async function updateUser(req, res) {
    try {
        const { name, email, password } = req.body;

        let id
        if (req.params.id && req.user.role == "ADMIN") {
            id = req.params.id;
        }
        id = req.user.id;


        let user = await User.findById(id);
        if (!user) return res.status(404).send("User not found");

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        user = user.toObject()
        delete user.password;

        res.send(user);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

async function deleteUser(req, res) {
    try {
        let id;

        if (req.params.id && req.user.role == "ADMIN") {
            id = req.params.id;
        }
        id = req.user.id;

        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send("User not found");
        res.status(204).send("User deleted");
    } catch (error) {
        logger.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    register,
    login,
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};