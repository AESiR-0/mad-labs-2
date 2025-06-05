import { NextResponse } from 'next/server';
import { google } from 'googleapis';

function formatDate() {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sheet configuration
const SHEET_CONFIG = {
    Kids: {
        range: 'Kids!A:G',
        headers: ['Name', 'Email', 'Phone', 'Age', 'City', 'Curious', 'Date Submitted']
    },
    Parents: {
        range: 'Parents!A:H',
        headers: ['Parent Name', 'Parent Email', 'Parent Phone', 'Parent City', 'Kid Name', 'Kid Age', 'Parent Curious', 'Date Submitted']
    }
};

// Auth setup
async function getAuth() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return auth;
}

// Initialize sheets with headers if they don't exist
async function initializeSheets(auth: any) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    try {
        // Check if sheets exist
        const response = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        const existingSheets = response.data.sheets?.map(sheet => sheet.properties?.title) || [];

        // Create sheets if they don't exist
        for (const [sheetName, config] of Object.entries(SHEET_CONFIG)) {
            if (!existingSheets.includes(sheetName)) {
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
                    valueInputOption: 'RAW',
                    requestBody: {
                        values: [config.headers],
                    },
                });
            }
        }
    } catch (error) {
        console.error('Error initializing sheets:', error);
        throw error;
    }
}

// Generic function to append data to sheets
async function appendToSheet(sheetName: string, values: any[]) {
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: SHEET_CONFIG[sheetName as keyof typeof SHEET_CONFIG].range,
            valueInputOption: 'RAW',
            requestBody: {
                values: [values],
            },
        });
    } catch (error) {
        console.error(`Error appending to ${sheetName} sheet:`, error);
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { kidData, parentData, mentorData } = body;

        // Initialize sheets
        const auth = await getAuth();
        await initializeSheets(auth);
        if (mentorData) {
            const mentorValues = [
                mentorData.name,
                mentorData.email,
                mentorData.phone,
                mentorData.city,
                mentorData.work,
                mentorData.links,
                mentorData.whyMentor,
                mentorData.helpStyle,
                mentorData.madFit,
                mentorData.availability,
                mentorData.additional,
                formatDate()
            ];
            await appendToSheet("Mentors", mentorValues);
        }

        // Handle kid form submission
        if (kidData) {
            const kidValues = [
                kidData.name,
                kidData.email,
                kidData.phone,
                kidData.age,
                kidData.city,
                kidData.curious,
                formatDate()
            ];
            await appendToSheet("Kids", kidValues);
        }

        // Handle parent form submission
        if (parentData) {
            const parentValues = [
                parentData.parentName,
                parentData.parentEmail,
                parentData.parentPhone,
                parentData.parentCity,
                parentData.kidName,
                parentData.kidAge,
                parentData.parentCurious,
                formatDate()
            ];
            await appendToSheet("Parents", parentValues);
        }

        // If neither kid nor parent data is present, throw error
        if (!kidData && !parentData) {
            throw new Error('No form data provided');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
} 