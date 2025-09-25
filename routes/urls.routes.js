import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/url.model.js";
import { validateUrl } from "../utils/utils.js";

const router = express.Router();

const base = process.env.BASE || "http://localhost:3001";

router.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json({ message: `Url not found` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allData = await Url.find();
    console.log(allData);
    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error ${error}` });
  }
});

router.post("/short", async (req, res) => {
  const { origUrl } = req.body;
  const urlId = nanoid(8);

  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          clicks: 0,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Server error: ${error}` });
    }
  } else {
    res.status(400).json({ message: "Invalid original url" });
  }
});

export default router;
