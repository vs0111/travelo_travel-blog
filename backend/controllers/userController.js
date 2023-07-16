const { User, validate, validateLogin } = require("../model/userModel");
const bcrypt = require("bcrypt");

const userController = {
  signup: async (req, res) => {
    try {
      const { error } = validate(req.body);

      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      console.log("No V Problem");
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { error } = validateLogin(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = user.generateAuthToken();

      res.status(200).send({ user, token, message: "logged in successfully" });
    } catch (error) {
      res.status(500).send({ error });
    }
  },

  editProfile: async (req, res) => {
    userId = req.params.id;
    userData = req.body;
    console.log(userId);
    console.log(userData);
    try {
      await User.findByIdAndUpdate(
        Object(req.params.id),
        {
          $set: userData,
        },
        { new: true }
      )
        .then((updatedUser) => {
          res
            .status(200)
            .json({ updatedUser, msg: "Account has been updated" });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      // Retrieve all user details from the database
      const users = await User.find();

      // Return the user details
      res.json(users);
    } catch (error) {
      console.error("Error retrieving user details:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
  getAuthor: async (req, res) => {
    try {
      const authors = await User.find({ author: true }); // Fetch users where author is true
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getOneUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  blockUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { block: true },
        { new: true }
      );
      res.status(200).json({ block: true });
    } catch (error) {
      console.error("Error updating user author status:", error);
      throw error;
    }
  },
  unBlockUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { block: false },
        { new: true }
      );
      res.status(200).json({ block: false });
    } catch (error) {
      console.error("Error updating user author status:", error);
      throw error;
    }
  },
};

module.exports = userController;
