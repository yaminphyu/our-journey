import * as XLSX from "xlsx";
import { db } from "../../lib/firebaseAdmin";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function getAllRSVPs() {
  const snapshot = await db
    .collection("rsvps")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function sendRSVPToTelegram(data, guestName) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram environment variables are missing");
  }

  // Create Excel workbook in memory
  const workbook = XLSX.utils.book_new();

  const worksheetData = data.map((item) => ({
    ID: item.id,
    Name: item.name,
    Guests: item.guests,
    Attending: item.attending,
    Message: item.message,
    "Created At": item.createdAt,
  }));

  console.log({ worksheetData });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "RSVP"
  );

  // Generate XLSX in memory
  const fileBuffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  const form = new FormData();
  form.append("chat_id", TELEGRAM_CHAT_ID);

  const file = new File(
    [fileBuffer],
    "guest-wishes.xlsx",
    {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  form.append("document", file);

  form.append(
    "caption",
    `${guestName} — New RSVP received ✅`
  );

  const telegramUrl =
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

  console.log({ telegramUrl });

  const response = await fetch(telegramUrl, {
    method: "POST",
    body: form,
  });

  const result = await response.json();
  if (!response.ok || !result.ok) {
    console.error("Telegram send failed:", result);

    throw new Error(
      result.description || "Failed to send file to Telegram"
    );
  }
  return result;
}

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const {
        name,
        guests,
        message,
        attending,
      } = req.body;

      // Validate name
      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      // Create RSVP record
      const newRSVP = {
        name: name.trim(),
        guests: attending ? Number(guests) || 0 : 0,
        attending: attending ? "Yes" : "No",
        message: message?.trim() || "",
        createdAt: new Date().toISOString(),
      };

      const docRef = await db
        .collection("rsvps")
        .add(newRSVP);

      const savedRSVP = {
        id: docRef.id,
        ...newRSVP,
      };

      console.log(
        "RSVP saved to Firebase:",
        savedRSVP
      );

      const allRSVPs = await getAllRSVPs();
      console.log({ allRSVPs });

      try {
        await sendRSVPToTelegram(
          allRSVPs,
          savedRSVP.name
        );
      } catch (telegramError) {
        // Firebase save succeeded even if Telegram fails
        console.error(
          "Telegram error:",
          telegramError
        );
      }

      return res.status(201).json({
        success: true,
        message: "RSVP saved successfully",
        data: savedRSVP,
      });
    }

    if (req.method === "GET") {
      const data = await getAllRSVPs();

      return res.status(200).json({
        success: true,
        data,
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("RSVP API error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
      }),
    });
  }
}

// import * as XLSX from "xlsx";
// import { db } from '../../lib/firebaseAdmin';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// async function getAllRSVPs() {
//   const snapshot = await db
//     .collection("rsvps")
//     .orderBy("createdAt", "desc")
//     .get();

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }

// async function sendFileToTelegram(data, guestName) {
//   if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
//     throw new Error("Telegram environment variables are missing");
//   }

//   // Create Excel workbook in memory
//   const workbook = XLSX.utils.book_new();

//   const worksheetData = data.map((item) => ({
//     ID: item.id,
//     Name: item.name,
//     Guests: item.guests,
//     Attending: item.attending,
//     Message: item.message,
//     "Created At": item.createdAt,
//   }));

//   const worksheet = XLSX.utils.json_to_sheet(worksheetData);

//   XLSX.utils.book_append_sheet(
//     workbook,
//     worksheet,
//     "RSVP"
//   );

//   // Generate XLSX in memory
//   const fileBuffer = XLSX.write(workbook, {
//     type: "buffer",
//     bookType: "xlsx",
//   });

//   // Convert Buffer to Blob
//   const fileBlob = new Blob([fileBuffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });

//   const form = new FormData();
//   form.append("chat_id", TELEGRAM_CHAT_ID);
//   form.append("document", fileBlob, "guest-wishes.xlsx");
//   form.append("caption", `${guestName} — New RSVP received ✅`);

//   const url =
//     `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

//   const response = await fetch(url, {
//     method: "POST",
//     body: form,
//   });

//   const result = await response.json();
//   if (!result.ok) {
//     console.error("Telegram send failed:", result);

//     throw new Error(
//       result.description || "Failed to send file to Telegram"
//     );
//   }
//   return result;
// }

// export default async function handler(req, res) {
//   try {
//     if (req.method === "POST") {
//       const {
//         name,
//         guests,
//         message,
//         attending,
//       } = req.body;

//       // Validate name
//       if (!name) {
//         return res.status(400).json({
//           success: false,
//           message: "Name is required",
//         });
//       }

//       // Create RSVP record
//       const newRSVP = {
//         name: name.trim(),
//         guests: attending ? Number(guests) || 0 : 0,
//         attending: attending ? "Yes" : "No",
//         message: message?.trim() || "",
//         createdAt: new Date().toISOString(),
//       };

//       const docRef = await db
//         .collection("rsvps")
//         .add(newRSVP);

//       const savedRSVP = {
//         id: docRef.id,
//         ...newRSVP,
//       };

//       console.log(
//         "RSVP saved to Firebase:",
//         savedRSVP
//       );

//       const allRSVPs = await getAllRSVPs();

//       try {
//         await sendFileToTelegram(
//           allRSVPs,
//           savedRSVP.name
//         );
//       } catch (telegramError) {
//         // Firebase save succeeded even if Telegram fails
//         console.error(
//           "Telegram error:",
//           telegramError
//         );
//       }

//       return res.status(201).json({
//         success: true,
//         message: "RSVP saved successfully",
//         data: savedRSVP,
//       });
//     }

//     if (req.method === "GET") {
//       const data = await getAllRSVPs();

//       return res.status(200).json({
//         success: true,
//         data,
//       });
//     }

//     return res.status(405).json({
//       success: false,
//       message: "Method not allowed",
//     });
//   } catch (error) {
//     console.error("RSVP API error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : undefined,
//     });
//   }
// }

// // import * as XLSX from "xlsx";

// // const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// // const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// // async function sendRSVPToTelegram(rsvp) {
// //   if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
// //     throw new Error("Telegram environment variables are missing");
// //   }

// //   // Create Excel workbook in memory
// //   const workbook = XLSX.utils.book_new();

// //   const worksheet = XLSX.utils.json_to_sheet([
// //     {
// //       ID: rsvp.ID,
// //       Name: rsvp.name,
// //       Attending: rsvp.attending,
// //       Guests: rsvp.guests,
// //       Message: rsvp.message,
// //       "Created At": rsvp.createdAt,
// //     },
// //   ]);

// //   XLSX.utils.book_append_sheet(
// //     workbook,
// //     worksheet,
// //     "RSVP"
// //   );

// //   // Convert workbook to Buffer
// //   const fileBuffer = XLSX.write(workbook, {
// //     type: "buffer",
// //     bookType: "xlsx",
// //   });

// //   // Convert Buffer to Blob
// //   const fileBlob = new Blob([fileBuffer], {
// //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //   });

// //   const form = new FormData();
// //   form.append("chat_id", TELEGRAM_CHAT_ID);
// //   form.append("document", fileBlob, "guest-wishes.xlsx");
// //   form.append("caption", `${rsvp.name} — New RSVP received ✅`);

// //   const url =
// //     `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

// //   const response = await fetch(url, {
// //     method: "POST",
// //     body: form,
// //   });

// //   const result = await response.json();
// //   if (!result.ok) {
// //     console.error("Telegram send failed:", result);

// //     throw new Error(
// //       result.description || "Failed to send file to Telegram"
// //     );
// //   }
// //   return result;
// // }

// // export default async function handler(req, res) {
// //   try {
// //     if (req.method !== "POST") {
// //       return res.status(405).json({
// //         success: false,
// //         message: "Method not allowed",
// //       });
// //     }

// //     const {
// //       name,
// //       guests,
// //       message,
// //       attending,
// //     } = req.body;

// //     if (!name) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name is required",
// //       });
// //     }

// //     const newRSVP = {
// //       ID: Date.now(),
// //       name,
// //       attending: attending ? "Yes" : "No",
// //       guests: attending ? Number(guests) || 0 : 0,
// //       message: message || "",
// //       createdAt: new Date().toISOString(),
// //     };

// //     // Send Excel directly to Telegram
// //     await sendRSVPToTelegram(newRSVP);

// //     return res.status(201).json({
// //       success: true,
// //       message: "RSVP sent successfully",
// //       data: newRSVP,
// //     });
// //   } catch (error) {
// //     console.error("RSVP API error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || "Something went wrong",
// //     });
// //   }
// // }

// // // import fs from "fs";
// // // import path from "path";
// // // import * as XLSX from "xlsx";
// // // import FormData from "form-data";

// // // // const filePath = path.join(process.cwd(), "data", "guest-wishes.xlsx");
// // // const filePath = path.join("/tmp", "guest-wishes.xlsx");

// // // const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// // // const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// // // function ensureFileExists() {
// // //   const dataDirectory = path.join(process.cwd(), "data");
// // //   if (!fs.existsSync(dataDirectory)) {
// // //     fs.mkdirSync(dataDirectory, { recursive: true });
// // //   }
// // //   if (!fs.existsSync(filePath)) {
// // //     const workbook = XLSX.utils.book_new();
// // //     const worksheet = XLSX.utils.json_to_sheet([]);
// // //     XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP");
// // //     XLSX.writeFile(workbook, filePath);
// // //   }
// // // }

// // // async function sendFileToTelegram(guestName) {
// // //   if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
// // //     console.error("Telegram env vars missing");
// // //     return;
// // //   }

// // //   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

// // //   const fileBuffer = fs.readFileSync(filePath);
// // //   const fileBlob = new Blob([fileBuffer], {
// // //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //   });

// // //   const form = new FormData();
// // //   form.append("chat_id", TELEGRAM_CHAT_ID);
// // //   form.append("document", fileBlob, "guest-wishes.xlsx");
// // //   form.append("caption", `${guestName} — New RSVP received ✅`);

// // //   const response = await fetch(url, {
// // //     method: "POST",
// // //     body: form,
// // //   });

// // //   const result = await response.json();
// // //   if (!result.ok) {
// // //     console.error("Telegram send failed:", result);
// // //   } else {
// // //     console.log("Telegram send success");
// // //   }
// // //   return result;
// // // }

// // // export default function handler(req, res) {
// // //   try {
// // //     ensureFileExists();

// // //     if (req.method === "GET") {
// // //       const workbook = XLSX.readFile(filePath);
// // //       const worksheet = workbook.Sheets["RSVP"];
// // //       const data = XLSX.utils.sheet_to_json(worksheet);
// // //       return res.status(200).json({ success: true, data });
// // //     }

// // //     if (req.method === "POST") {
// // //       const { name, guests, message, attending } = req.body;

// // //       if (!name) {
// // //         return res.status(400).json({
// // //           success: false,
// // //           message: "Name is required",
// // //         });
// // //       }

// // //       const workbook = XLSX.readFile(filePath);
// // //       const worksheet = workbook.Sheets["RSVP"];
// // //       const existingData = XLSX.utils.sheet_to_json(worksheet);

// // //       const newRSVP = {
// // //         ID: Date.now(),
// // //         name,
// // //         attending: attending ? "Yes" : "No",
// // //         guests: attending ? guests : 0,
// // //         message: message || "",
// // //         createdAt: new Date().toISOString(),
// // //       };
      
// // //       const updatedData = [...existingData, newRSVP];
// // //       const newWorksheet = XLSX.utils.json_to_sheet(updatedData);
// // //       workbook.Sheets["RSVP"] = newWorksheet;
// // //       XLSX.writeFile(workbook, filePath);

// // //       // Fire off to Telegram (don't block the response on failure)
// // //       sendFileToTelegram(newRSVP?.name).catch((err) =>
// // //         console.error("Telegram error:", err)
// // //       );

// // //       return res.status(201).json({
// // //         success: true,
// // //         message: "RSVP saved successfully",
// // //         data: newRSVP,
// // //       });
// // //     }

// // //     return res.status(405).json({
// // //       success: false,
// // //       message: "Method not allowed",
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "Something went wrong",
// // //     });
// // //   }
// // // }
