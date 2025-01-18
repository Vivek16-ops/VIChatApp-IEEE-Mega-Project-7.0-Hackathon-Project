import Express from "express";
import { aifunctionalityAPI } from "../controllers/ai.controller.js";
import { aiComposerAPI } from "../controllers/ai.composer.controller.js";
import { aiImageGenerationAPI } from "../controllers/ai.imageGeneration.controller.js";

const router = Express.Router();

router.post("/useAIModel", aifunctionalityAPI);
router.post("/useAIComposer", aiComposerAPI);
router.post("/useAIImageGeneration", aiImageGenerationAPI);
export default router