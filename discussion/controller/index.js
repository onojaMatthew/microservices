const { Discussion } = require("../model");

exports.postDiscussion = (req, res) => {
  const { owner, comment, createdBy } = req.body;
  
  if (!owner) return res.status(400).json({ error: "Author name is required" });
  if (!comment) return res.status(400).json({ error: "You have to provide the message content" });
  if (!createdBy) return res.status(400).json({ error: "Author ID is required" });

  let discussion = new Discussion({
    owner,
    comment,
    createdBy
  });
  return discussion.save()
    .then(result => {
      if (!result) return res.status(400).json({ error: "Can not create new entry" });
      res.json(result);
    })
    .catch(err => {
      res.json(err.message);
    });
}

exports.fetchDiscussion = (req, res) => {
  const { authorIds } = req.body;
  if (!authorIds || authorIds.length === 0) return res.status(400).json({ error: "Please provide the authors Id" });
  let result = [];
  Discussion.find({})
    .then(discussion => {
      if (!discussion) return res.status(400).json({ error: "Records empty" });
      discussion.forEach(currentItem => {
        const id = currentItem.createdBy;
        if (authorIds.includes(id)) {
          result.push(currentItem);
        }
      });
      res.json(result);
      console.log(result)
      return result;
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.fetchAllDiscussion = (req, res) => {
  Discussion.find({})
    .then(discussion => {
      if (!discussion) return res.status(400).json({ error: "No records found" });
      res.json(discussion);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.deleteDiscussion = (req, res) => {
  const { discussionId } = req.params;
  if (!discussionId) return res.status(400).json({ error: "The id of the discussion to be deleted is required" });
  Discussion.findByIdAndRemove(discussionId)
    .then(discussion => {
      res.json({ success: "Discussion successfully deleted"})
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

