import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/generateToken";
import { $Enums } from "../generated/prisma";
import { Readable } from "stream";

interface RegisterRequestBody {
  fullname: string;
  email: string;
  username: string;
  password: string;
  blood_type: string;
  gender: string;
  role: string;
}

// normal user registration
export const userRegister = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { fullname, email, username, password, gender, blood_type } =
      req.body;
    if (
      !fullname ||
      !email ||
      !username ||
      !password ||
      !gender ||
      !blood_type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "fullname, email, username, password, blood_type, gender these fields are required",
      });
    }
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (userExists) {
      let message = "username or email already exists";
      if (userExists.email === email) {
        message = "user with this email already exists";
      } else if (userExists.username === username) {
        message = "Username already taken";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        username,
        password: hashedPassword,
        blood_type: blood_type as $Enums.BloodType,
        gender: gender as $Enums.Gender,
        role: "USER",
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        blood_type: true,
        role: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const expiresIn = 7 * 24 * 60 * 60;

    const token = generateToken(newUser.id, expiresIn);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// admin registration
export const adminRegister = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { fullname, email, username, password, gender, blood_type } =
      req.body;
    if (
      !fullname ||
      !email ||
      !username ||
      !password ||
      !blood_type ||
      !gender
    ) {
      return res.status(400).json({
        success: false,
        message:
          "fullname, email, username, password, blood_type, gender these fields are required",
      });
    }
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (userExists) {
      let message = "username or email already exists";
      if (userExists.email === email) {
        message = "user with this email already exists";
      } else if (userExists.username === username) {
        message = "Username already taken";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        username,
        password: hashedPassword,
        blood_type: blood_type as $Enums.BloodType,
        gender: gender as $Enums.Gender,
        role: "ADMIN",
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        blood_type: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const expiresIn = 7 * 24 * 60 * 60;

    const token = generateToken(newUser.id, expiresIn);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// staff registration
export const staffRegister = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { fullname, email, username, password, gender, blood_type } =
      req.body;
    if (
      !fullname ||
      !email ||
      !username ||
      !password ||
      !blood_type ||
      !gender
    ) {
      return res.status(400).json({
        success: false,
        message:
          "fullname, email, username, password, blood_type, gender these fields are required",
      });
    }
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (userExists) {
      let message = "username or email already exists";
      if (userExists.email === email) {
        message = "user with this email already exists";
      } else if (userExists.username === username) {
        message = "Username already taken";
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        username,
        password: hashedPassword,
        blood_type: blood_type as $Enums.BloodType,
        gender: gender as $Enums.Gender,
        role: "STAFF",
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        blood_type: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const expiresIn = 7 * 24 * 60 * 60;

    const token = generateToken(newUser.id, expiresIn);

    res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      newUser,
      token,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user with this email doesn't exists",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const expiresIn = 7 * 24 * 60 * 60;
    const token = generateToken(user.id, expiresIn);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        blood_type: user.blood_type,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error: any) {
    console.log("Error at login: ", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get user profile
export const profile = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all users - admin only
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        blood_type: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.setHeader("Content-Type", "application/json");
    res.write(
      '{"success":true,"message":"Users retrieved successfully","users":['
    );

    let first = true;
    const readable = Readable.from(users);

    readable.on("data", (user) => {
      const chunk = JSON.stringify(user);
      if (!first) res.write(",");
      res.write(chunk);
      first = false;
    });

    readable.on("end", () => {
      res.write("]}");
      res.end();
    });

    readable.on("error", (err) => {
      // console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Error streaming users" });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
