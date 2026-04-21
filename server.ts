import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Premium Data for FrameX Studios
  const agencyData = {
    agency_name: "FrameX Studios",
    founders: ["Shubh Barman", "Nehith"],
    footer_copyright: "© 2026 FrameX Studios. Nehith & Shubh",
    contact: {
      email: "team@framexstudios.in",
      instagram: "https://www.instagram.com/framexstudios.in",
      twitter: "https://x.com/FrameXStudios",
      discord: "https://discord.gg/framexstudios"
    },
    navigation: ["Home", "Our Work", "Ads Samples", "Website Samples", "Application Samples"],
    home: {
      hero_badge: "PREMIUM CREATIVE STUDIO",
      hero_title: "FrameX Studios",
      hero_description: "FrameXStudios crafts cinematic edits, jaw-dropping thumbnails, and cutting-edge digital experiences that turn viewers into fans.",
      about_us: {
        title: "About Us",
        description: "Founded by visionary creators Shubh Barman and Nehith, FrameX Studios is dedicated to pushing the boundaries of digital content. We believe in the power of visual storytelling to elevate brands and captivate audiences worldwide.",
        founders: ["Shubh Barman", "Nehith"]
      }
    },
    our_work: {
      page_title: "Explore our creative outputs.",
      page_subtitle: "Visual excellence across all formats.",
      categories: [
        {
          id: "video-editing",
          title: "Editing Samples",
          description: "High-retention cinematic edits.",
          sub_categories: {
            gaming: [
              { youtube_id: "a7PFtlhXVmM" },
              { youtube_id: "n3P3G3qpdyE" },
              { youtube_id: "OuH80ndoRmU" },
              { youtube_id: "bffSjPOxGLk" }
            ],
            other: [
              { youtube_id: "NbfGEMcUnGQ" },
              { youtube_id: "-MCC-NkhxRM" }
            ]
          }
        },
        {
          id: "thumbnail-design",
          title: "Thumbnail Samples",
          description: "Click-driven visual identity.",
          sub_categories: {
            gaming: [
              { image_url: "https://i.postimg.cc/GHHJ07X3/image.png" },
              { image_url: "https://i.postimg.cc/HVV4GZ62/image.png" },
              { image_url: "https://i.postimg.cc/fJp7McPC/image.png" },
              { image_url: "https://i.postimg.cc/3dVj3X65/image.png" },
              { image_url: "https://i.postimg.cc/SJ3Lm65p/image.png" },
              { image_url: "https://i.postimg.cc/ZWN8n9kD/image.png" },
              { image_url: "https://i.postimg.cc/BjFTb8Wd/image.png" }
            ],
            other: []
          }
        }
      ]
    },
    ads_samples: {
      page_title: "Ads Samples",
      page_subtitle: "Custom commercial ads for global brands.",
      loading_text: "PLEASE BE PATIENT WHILE VIDEOS ARE LOADING.",
      promotional_videos: []
    },
    placeholders: {
      website_samples_title: "Website Samples",
      application_samples_title: "Application Samples",
      placeholder_message: "We are currently under development. Coming soon. Sorry for the inconvenience."
    }
  };

  // API Endpoints
  app.get("/api/data", (req, res) => {
    res.json(agencyData);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
