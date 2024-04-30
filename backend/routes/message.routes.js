import express from "express";
import Message from "../controller/message.controller.js";
const router=express.Router();
router.post("/send:id",protectRoute,Message)
