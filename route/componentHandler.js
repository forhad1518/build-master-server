import Website from "../models/websiteModel.js";
import express from "express";

const componentRouter = express.Router();

/*................. Create Component................. */
// api is: /website/:webId/section/:secId/component
componentRouter.post("/:webId/section/:secId/component", async (req, res) => {
  // find Website
  const websiteQuery = await Website.findById(req.params.webId);
  try {
    if (!websiteQuery) {
      return res.status(404).json({ message: "Website not found" });
    }
    // find Section
    const sectionQuery = websiteQuery.sections.id(req.params.secId);

    // auto order increment
    let maxOrder = 0;
    if (sectionQuery.components.length > 0) {
      maxOrder = Math.max(
        ...sectionQuery.components.map((com) => com.componentOrder)
      );
    }
    const newComponentOrder = maxOrder + 1;
    // new component
    const newComponent = {
      ...req.body,
      componentOrder: newComponentOrder,
    };
    // Insert Component
    sectionQuery.components.push(newComponent);
    await websiteQuery.save();
    res.status(201).json({ message: "component successful create" });
  } catch (err) {
    res.status(500).json({ message: "Error adding component", error: err });
  }
});

/*................. get Component................. */
// api is: /website/:webId/section/:secId/component/:comId
componentRouter.get(
  "/:webId/section/:secId/component/:comId",
  async (req, res) => {
    // find website
    const websiteQuery = await Website.findById(req.params.webId);
    try {
      if (!websiteQuery) {
        return res.status(404).json({ message: "Website not found" });
      }
      // find section
      const sectionQuery = websiteQuery.sections.id(req.params.secId);
      if (!sectionQuery) {
        return res.status(404).json({ message: "Section not found" });
      }
      // find component
      const componentQuery = sectionQuery.components.id(req.params.comId);
      if (!componentQuery) {
        return res.status(404).json({ message: "component not found" });
      }
      res.send(componentQuery);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving component", error: err });
    }
  }
);

/*................. get all Component................. */
// api is: /website/:webId/section/:secId/component/:comId
componentRouter.get("/:webId/section/:secId/component", async (req, res) => {
  // find website
  const websiteQuery = await Website.findById(req.params.webId);
  try {
    if (!websiteQuery) {
      return res.status(404).json({ message: "Website not found" });
    }
    // find section
    const sectionQuery = websiteQuery.sections.id(req.params.secId);
    if (!sectionQuery) {
      return res.status(404).json({ message: "Section not found" });
    }
    // find component
    const componentQuery = sectionQuery.components;
    if (!componentQuery) {
      return res.status(404).json({ message: "components not found" });
    }
    res.send(componentQuery);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving component", error: err });
  }
});

/*................. delete Component................. */
// api is: /website/:webId/section/:secId/component/:comId
componentRouter.delete(
  "/:webId/section/:secId/component/:comId",
  async (req, res) => {
    // find website
    const websiteQuery = await Website.findById(req.params.webId);
    try {
      if (!websiteQuery) {
        return res.status(404).json({ message: "Website not found" });
      }
      // find section
      const sectionQuery = websiteQuery.sections.id(req.params.secId);
      if (!sectionQuery) {
        return res.status(404).json({ message: "Section not found" });
      }
      // delete component
      sectionQuery.components.pull({ _id: req.params.comId });
      websiteQuery.save();

      res.json({ message: "component deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving component", error: err.message });
    }
  }
);

export default componentRouter;
