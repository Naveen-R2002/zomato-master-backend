//Libraries
import express from "express";

//Database Model
import UserModel from "../../database/allModels";

const Router = express.Router();

/*
 * Route       /:_id
 * Des         GET user data
 * Params      _id
 * Access      Public
 * Method      GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);

    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ user: getUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * Route       /update
 * Des         Update user data
 * Params      _id
 * Access      Public
 * Method      PUT
 */
Router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      {
        new: true,
      }
    );
    return res.json({ user: updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
