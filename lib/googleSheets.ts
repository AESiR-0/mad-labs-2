import { google } from "googleapis";

const formatDate = () => {
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${mm}-${dd}-${yy}`;
};

// Types for different forms
type MentorFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  work: string;
  links: string;
  whyMentor: string;
  helpStyle: string;
  madFit: string;
  availability: string;
  additional: string;
};

type KidFormData = {
  name: string;
  age: string;
  email: string;
  phone: string;
  city: string;
  interests: string;
  whyJoin: string;
  projectIdea: string;
  availability: string;
  additional: string;
};

type ParentFormData = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  kidName: string;
  kidAge: string;
  city: string;
  whyMadLabs: string;
  expectations: string;
  availability: string;
  additional: string;
};

// Sheet configuration
const SHEET_CONFIG = {
  Mentors: {
    range: 'Mentors!A:L',
    headers: [
      'Name', 'Email', 'Phone', 'City', 'Work', 'Links',
      'Why Mentor', 'Help Style', 'Mad Fit', 'Availability',
      'Additional', 'Date Submitted'
    ]
  },
  Kids: {
    range: 'Kids!A:K',
    headers: [
      'Name', 'Age', 'Email', 'Phone', 'City', 'Interests',
      'Why Join', 'Project Idea', 'Availability', 'Additional',
      'Date Submitted'
    ]
  },
  Parents: {
    range: 'Parents!A:K',
    headers: [
      'Parent Name', 'Parent Email', 'Parent Phone', 'Kid Name',
      'Kid Age', 'City', 'Why Mad Labs', 'Expectations',
      'Availability', 'Additional', 'Date Submitted'
    ]
  }
};

// Auth setup
const getAuth = () => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
};

// Initialize sheets with headers if they don't exist
async function initializeSheets() {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  try {
    // Get all sheets in the spreadsheet
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const existingSheets = response.data.sheets?.map(sheet => sheet.properties?.title) || [];

    // Create missing sheets and add headers
    for (const [sheetName, config] of Object.entries(SHEET_CONFIG)) {
      if (!existingSheets.includes(sheetName)) {
        // Create new sheet
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            }],
          },
        });

        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: "RAW",
          requestBody: {
            values: [config.headers],
          },
        });
      }
    }
  } catch (error) {
    console.error("Error initializing sheets:", error);
    throw error;
  }
}

// Generic function to append data to sheets
async function appendToSheet(sheetName: string, values: any[]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const config = SHEET_CONFIG[sheetName as keyof typeof SHEET_CONFIG];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: config.range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    console.log(`Data successfully appended to ${sheetName}:`, response.data);
    return "Data successfully added to Google Sheet";
  } catch (error: any) {
    console.error(`Error appending data to ${sheetName}:`, error);
    throw new Error(
      error.response?.data?.error?.message ||
      `Failed to add data to ${sheetName}`
    );
  }
}

// Handler functions for each form type
export async function handleMentorForm(data: MentorFormData) {
  await initializeSheets();
  const dateOfSubmission = formatDate();
  const values = [
    data.name,
    data.email,
    data.phone,
    data.city,
    data.work,
    data.links,
    data.whyMentor,
    data.helpStyle,
    data.madFit,
    data.availability,
    data.additional,
    dateOfSubmission
  ];

  return appendToSheet("Mentors", values);
}

export async function handleKidForm(data: KidFormData) {
  await initializeSheets();
  const dateOfSubmission = formatDate();
  const values = [
    data.name,
    data.age,
    data.email,
    data.phone,
    data.city,
    data.interests,
    data.whyJoin,
    data.projectIdea,
    data.availability,
    data.additional,
    dateOfSubmission
  ];

  return appendToSheet("Kids", values);
}

export async function handleParentForm(data: ParentFormData) {
  await initializeSheets();
  const dateOfSubmission = formatDate();
  const values = [
    data.parentName,
    data.parentEmail,
    data.parentPhone,
    data.kidName,
    data.kidAge,
    data.city,
    data.whyMadLabs,
    data.expectations,
    data.availability,
    data.additional,
    dateOfSubmission
  ];

  return appendToSheet("Parents", values);
} 