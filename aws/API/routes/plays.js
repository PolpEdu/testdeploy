//esta file controla as dividas em geral.
const express = require("express");
const PlaysController = require("../controllers/plays");
const router = express.Router();

router.post("/", PlaysController.postPlay);

router.get("/", PlaysController.getRecentPlays);

router.get("/top", PlaysController.gettopplays);

router.get("/best", PlaysController.getBestPlayers);

module.exports = router;