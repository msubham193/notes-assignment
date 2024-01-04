import axios from "axios";
import { app } from "../index.js";

const BASE_URL = "http://localhost:3000"; // Update with your server's URL
const API_URL = `${BASE_URL}/api`;

let authToken;

const loginUser = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username: "testuser",
    password: "testpassword",
  });
  authToken = response.data.token;
};

beforeAll(async () => {
  await loginUser();
});

describe("GET /api/notes", () => {
  it("should get a list of all notes for the authenticated user", async () => {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
  });
});

// Test GET /api/notes/:id
describe("GET /api/notes/:id", () => {
  it("should get a note by ID for the authenticated user", async () => {
    // Assuming you have a valid noteId for testing
    const noteId = "your_valid_note_id";

    const response = await axios.get(`${API_URL}/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status).toBe(200);
    // Add more assertions based on your application's response structure
  });
});

// Test POST /api/notes
describe("POST /api/notes", () => {
  it("should create a new note for the authenticated user", async () => {
    const newNote = {
      title: "Test Note",
      content: "This is a test note content.",
    };

    const response = await axios.post(`${API_URL}/notes`, newNote, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(response.status).toBe(201);
  });
});

afterAll(async () => {
  // Assuming you have a method in your API to delete notes, modify this accordingly
  const deleteTestNotes = async () => {
    try {
      // Fetch all notes for the authenticated user
      const response = await axios.get(`${API_URL}/notes`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 200) {
        const notes = response.data;

        // Delete each test note
        const deletePromises = notes.map(async (note) => {
          if (note.title.startsWith("Test Note")) {
            // Assuming you have a method to delete a note by ID
            await axios.delete(`${API_URL}/notes/${note._id}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            });
          }
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
      }
    } catch (error) {
      console.error("Error cleaning up test notes:", error);
    }
  };

  // Call the function to delete test notes
  await deleteTestNotes();
});
