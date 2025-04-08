import Website from "../models/websiteModel.js";
import express from "express";
const sectionRouter = express.Router();

/*................. Create Section................. */
// api is: /website/:webId/section
sectionRouter.post("/:webId/section", async (req, res) => {
  const webisteQuiry = await Website.findById(req.params.webId);
  try {
    if (!webisteQuiry) {
      return res.status(404).json({ message: "Website Not found" });
    }
    // Auto order render
    /* Max Order */
    let maxOrder = 0;
    if (webisteQuiry.sections.length > 0) {
      maxOrder = Math.max(
        ...webisteQuiry.sections.map((sec) => sec.sectionOrder)
      );
    }
    const newSectionOrder = maxOrder + 1;
    const newSection = {
      ...req.body,
      sectionOrder: newSectionOrder,
    };
    // Insert Section
    webisteQuiry.sections.push(newSection);
    await webisteQuiry.save();
    res.status(201).json({ message: "section successful create" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding section", error: err.message });
  }
});

/*................. Get Section................. */
// api is: /website/:webId/section/:secId
sectionRouter.get("/:webId/section/:secId", async (req, res) => {
  // find Website
  const websiteQuery = await Website.findById(req.params.webId);
  try {
    if (!websiteQuery) {
      return res.status(404).json({ message: "Website not found" });
    }
    // find Section
    const sectionQuery = websiteQuery.sections.id(req.params.secId);
    if (!sectionQuery) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.send(sectionQuery);
  } catch (err) {
    res.status(500).json({ message: "Section Not found", error: err });
  }
});

/*................. Get all Section................. */
// api is: /website/:webId/section/:secId
sectionRouter.get("/:webId/section", async (req, res) => {
  // find Website
  const websiteQuery = await Website.findById(req.params.webId);
  try {
    if (!websiteQuery) {
      return res.status(404).json({ message: "Website not found" });
    }
    // find Section
    const sectionQuery = websiteQuery.sections;
    if (!sectionQuery) {
      return res.status(404).json({ message: "Sections not found" });
    }
    res.send(sectionQuery);
  } catch (err) {
    res.status(500).json({ message: "Section Not found", error: err });
  }
});

/*................. Delete Section................. */
// api is: /website/:webId/section/:secId
sectionRouter.delete("/:webId/section/:secId", async (req, res) => {
  // find Website
  const websiteQuery = await Website.findById(req.params.webId);
  try {
    if (!websiteQuery) {
      return res.status(404).json({ message: "Website not found" });
    }
    // Delete Section
    await websiteQuery.sections.pull({ _id: req.params.secId });
    await websiteQuery.save();

    res.json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Sections Not found", error: err });
  }
});

export default sectionRouter;
