import { Router } from "express";
import { IssueController } from "../controllers/IssueController.mjs";

const router = Router()

router.get('/', IssueController.index)
router.get('/report', IssueController.report)

export { router }