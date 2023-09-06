const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage"); // Import Firebase Storage related functions
const fapp = require("../firebase"); // Initialize your Firebase app
let streamifier = require("streamifier");

// import { v2 as cloudinary } from "cloudinary";

const v2 = require("cloudinary");
// const cloudinary = v2;

v2.config({
  cloud_name: "dx48vhkww",
  api_key: "327835388336598",
  api_secret: "IJo40XF1yvoyW9_2TNf9MyHqZ_A",
});

router.post("/create", upload.array("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const creator = req.user._id;
    const images = req.files;

    const urls = [];

    const run = async () => {
      for (const image of images) {
        console.log("loop ", image);
        let cld_upload_stream = v2.v2.uploader.upload_stream(
          {
            resource_type: "image",
            // public_id: "myfolder/mysubfolder/dog_closeup",
          },
          async (error, result) => {
            urls.push(result?.url);
            console.log("loop ", result);

            if (urls?.length == images?.length) {
              const project = new Project({
                name,
                image: urls,
                creator,
                description,
              });
              await project.save();

              res.status(201).json({ message: "Project created successfully" });
            }
          }
        );

        streamifier.createReadStream(image?.buffer).pipe(cld_upload_stream);
      }

      // console.log(urls);

      // if (urls.length > 0) {
      //   const project = new Project({
      //     name,
      //     image: urls,
      //     creator,
      //     description,
      //   });
      //   await project.save();

      //   res.status(201).json({ message: "Project created successfully" });
      // }
    };

    await run();

    // Create and save the project with the image URL
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/get", async (req, res) => {
  try {
    const projects = await Project.find().populate("creator", "username");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
});

// Get all projects
router.get("/delete/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete projects" });
  }
});

module.exports = router;
