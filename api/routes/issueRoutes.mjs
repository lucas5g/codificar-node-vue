import { Router } from "express";
import { IssueController } from "../controllers/IssueController.mjs";

const router = Router()

router.get('/', IssueController.index)

export { router }