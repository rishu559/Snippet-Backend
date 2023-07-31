const Snippet = require("../models/Snippet");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const flag = req.query.search;
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search ,$options:'i' } },
          { description: { $regex: req.query.search ,$options:'i'} },
        ],
      }
    : {};
  try {
    let snippets;

    if (!flag) {
      snippets = await Snippet.find().limit(10);
    } else {
      snippets = await Snippet.find(keyword);
    }

    return res.status(200).json(snippets);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  console.log("testted");
  const newSnippet = req.body;
  if (newSnippet.secret !== process.env.SECRET) {
    return res.status(200).json("not authorized");
  }
  try {
    const snippet = await Snippet.create(req.body);
    const savedSnippet = await snippet.save();
    return res.json(savedSnippet).status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
