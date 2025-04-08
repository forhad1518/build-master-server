import express from "express";
import Website from "../models/websiteModel.js";
const websiteRouter = express.Router();

/*................. Create Website................. */
// Api Is: /website
websiteRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newWebsite = new Website(data);
    await newWebsite.save();
    res.status(201).json(newWebsite);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

/*................. Get Website................. */
// Api Is: /website/:webId
websiteRouter.get("/:webId", async (req, res) => {
  const webId = req.params.webId;
  const result = await Website.findById(webId);
  if (!result) {
    return res.status(400).json({ message: "Website is not found", error });
  }
  res.send({ website: result });
});

/*................. Get All Website................. */
// Api Is: /website/:webId
websiteRouter.get("/", async (req, res) => {
  const result = await Website.find();
  if (!result) {
    return res.status(400).json({ message: "Website is not found", error });
  }
  res.send({ website: result });
});

/*................. Delete Website................. */
// Api Is: /website/:webId
websiteRouter.delete("/:webId", async (req, res) => {
  const webId = req.params.webId;
  await Website.deleteOne({ _id: webId })
    .then(() => res.send({ message: "Website delete successful" }))
    .catch((err) =>
      res.status(400).json({ message: "Website is not found", err })
    );
});

export default websiteRouter;
