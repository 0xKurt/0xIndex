import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/data", express.static(__dirname + "/public/data"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Get all projects of a specific blockchain sorted by category and clicks
app.get("/blockchains/:blockchain/projects", async (req, res) => {
  const blockchainId = req.params.blockchain;

  try {
    // Find the blockchain with the given id and include its projects with their categories
    const projectsByCategory = await prisma.category.findMany({
      where: {
        projects: {
          some: {
            blockchains: {
              some: {
                id: Number(blockchainId),
              },
            },
          },
        },
      },
      include: {
        projects: {
          where: {
            blockchains: {
              some: {
                id: Number(blockchainId),
              },
            },
          },
          include: {
            categories: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Return the projects
    res.json(projectsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

// Get all blockchains without any further information
app.get("/blockchains", async (req, res) => {
  try {
    const blockchains = await prisma.blockchain.findMany();

    const idWhitelist = [88, 37, 8, 1, 418, 413];
    const validRes = blockchains.filter((blockchain) => {
      return idWhitelist.includes(blockchain.id);
    });
    res.json(validRes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/b", async (req, res) => {
  try {
    async function findBlockchainsWithMoreThan20Projects() {
       const blockchains = await prisma.blockchain.findMany({
         where: {
           projects: {
             some: {},
           },
         },
         select: {
           id: true,
           projects: {
             select: {
               id: true,
             },
             take: 101, // limit the number of projects to 21
           },
         },
       });

       const blockchainIdsWithMoreThan20Projects = blockchains
         .filter((blockchain) => blockchain.projects.length > 100)
         .map((blockchain) => blockchain.id);

        return blockchainIdsWithMoreThan20Projects;
    }

    const blockchains = await findBlockchainsWithMoreThan20Projects();
    res.json(blockchains);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/projects/:id/click", async (req, res) => {
  const projectId = parseInt(req.params.id);
  const { ip } = req;

  // Get the project by id
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { blockchains: true, categories: true },
  });

  // If the project doesn't exist, return 404 Not Found
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Check if the IP address has already incremented the clicks for this project in the last 24 hours
  const lastClick = project.ratingIpMap && project.ratingIpMap[ip];
  if (lastClick && Date.now() - lastClick < 24 * 60 * 60 * 1000) {
    return res.status(403).json({
      message: "You can only increment the clicks once every 24 hours",
    });
  }

  // Update the clicks count and the clicksIpMap
  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      clicks: project.rating + 1,
      clicksIpMap: { ...project.ratingIpMap, [ip]: Date.now() },
    },
    include: { blockchains: true, categories: true },
  });

  res.json(updatedProject);
});

// =====================================

const port = process.env.PORT || 42069;

if (fs.existsSync("server.key") && fs.existsSync("server.crt")) {
  // HTTPS
  const privateKey = fs.readFileSync("server.key", "utf8");
  const certificate = fs.readFileSync("server.crt", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, () => {
    console.log(`HTTPS server running on port ${port}`);
  });
} else {
  // HTTP
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
  });
}
