import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({
    users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: `User with id ${id} not found`,
    });
  }

  res.json(user);
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (existEmail) {
      return res.status(400).json({
        msg: `Email ${body.email} already exists`,
      });
    }

    const user = User.build(body);
    await user.save();

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: `User with id ${id} not found`,
      });
    }
    // need to validate email

    await user.update(body);

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: "deleteUser",
    id,
  });
};
