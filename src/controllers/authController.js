import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import generateAccessToken from './jwtToken.js';
import User from'../models/User.js';
import Role from '../models/Role.js';

const registration = async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ message: "Error registration ", errors });
      }

      const {username, password} = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
         return res.status(400).json({ message: 'User with that name already there is' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);// salt 7
      const userRole = await Role.findOne({ value: 'ADMIN' });

      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      user.save(); // save in db

      return res.json({ message: 'User  successfully registration' });
   } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error 1'});
   }
};

const login = async (req, res) => {
   try {
      const {username, password} = req.body;
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(400).json({ message: `User ${username} not found` });
      }

      const checkValidPassword = bcrypt.compareSync(password, user.password);

      if (!checkValidPassword) {
         return res.status(400).json({ message: `Password isn't valid` });
      }
      const token = generateAccessToken(user._id, user.roles); // id по дефолту монго дає

      return res.json({ token });
   } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error'});
   }
};


const getUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'GetUsers error'});

   }
};

export { registration, login, getUsers };
