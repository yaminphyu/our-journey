import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const filePath = path.join(process.cwd(), "data", "rsvp.xlsx");

function ensureFileExists() {
  const dataDirectory = path.join(process.cwd(), "data");

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet([]);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "RSVP"
    );

    XLSX.writeFile(workbook, filePath);
  }
}

export default function handler(req, res) {
  try {
    ensureFileExists();

    // =========================
    // GET RSVP
    // =========================

    if (req.method === "GET") {
      const workbook = XLSX.readFile(filePath);

      const worksheet = workbook.Sheets["RSVP"];

      const data = XLSX.utils.sheet_to_json(worksheet);

      return res.status(200).json({
        success: true,
        data,
      });
    }

    // =========================
    // POST RSVP
    // =========================

    if (req.method === "POST") {
      const {
        name,
        guests,
        message,
        attending,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      const workbook = XLSX.readFile(filePath);

      const worksheet = workbook.Sheets["RSVP"];

      const existingData = XLSX.utils.sheet_to_json(
        worksheet
      );

      const newRSVP = {
        id: Date.now(),

        name,

        guests: guests || 1,

        message: message || "",

        attending: attending ? "Yes" : "No",

        createdAt: new Date().toISOString(),
      };

      const updatedData = [
        ...existingData,
        newRSVP,
      ];

      const newWorksheet =
        XLSX.utils.json_to_sheet(updatedData);

      workbook.Sheets["RSVP"] = newWorksheet;

      XLSX.writeFile(workbook, filePath);

      return res.status(201).json({
        success: true,
        message: "RSVP saved successfully",
        data: newRSVP,
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}