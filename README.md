# Drone Recognition Quiz App — Copilot Build Instructions

## 📌 Project Overview
Build a **mobile-first, highly user-friendly quiz application** that trains users to visually identify drones and distinguish them from aircraft.

The app must prioritize:
- Simplicity
- Visual learning
- Fast interaction
- Clean UI/UX
- Touch-friendly design

---

## 📱 Platform Compatibility (REQUIRED)
The application MUST be fully compatible with:

- **iOS devices (iPhone & iPad)**
- **Android devices (phones & tablets)**

### Requirements:
- Use **React Native (Expo)** to ensure cross-platform support
- UI must render consistently across both platforms
- Touch interactions must behave identically on iOS and Android
- Ensure proper handling of:
  - Different screen sizes
  - Safe areas (notches, dynamic islands, etc.)
  - Performance across mid-tier devices

---

## 🎯 Core Learning Objectives
The app will train users to identify:

### 1. Drone Types
- Quadcopter
- Hexacopter
- Tricopter
- Single-rotor copter

### 2. Fixed-Wing Systems
- Fixed-wing drone
- Flying wing
- Traditional aircraft

### 3. Payload Recognition
- Identify drones **with payloads**
- Identify drones **without payloads**

### 4. Aircraft vs Drone (Lights)
- Based on **light spacing and patterns at night**

---

## 🧱 Tech Stack Requirements
Use:

- **React Native (Expo)**
- **TypeScript**
- **React Navigation or Expo Router**
- **AsyncStorage (local progress tracking)**
- **Jest (testing)**

Avoid overengineering. Keep components modular and clean.

---

## 🎨 UI/UX Requirements
The app MUST include:

- Large image display area
- Clear, bold question text
- 4 large answer buttons
- Immediate feedback (correct/incorrect)
- Short explanation after each question
- Progress bar or indicator
- Score tracking
- Retry incorrect questions
- Minimal, clean layout
- High contrast (accessible)

---

## 🔁 App Flow

### Home Screen
- Start Quiz
- Practice by Category
- Review Missed Questions
- Progress / Stats
- Settings

---

### Quiz Flow
1. Show image or image set
2. Display question
3. User selects answer
4. Show:
   - Correct / Incorrect
   - Explanation
5. Move to next question

---

### ❗ REQUIRED: Randomized Sessions
Each quiz session MUST:
- Randomly select questions from the question bank
- Randomize answer choice order
- Ensure users do NOT repeatedly see the same question order
- Provide a fresh experience every session

---

### ❗ REQUIRED: Learning Feedback System
If a user selects a **wrong answer**, the app MUST:

- Clearly indicate the correct answer
- Provide:
  - A short **definition**
  - A **why it’s correct explanation**
  - A **tip or pattern to recognize next time**

This is critical — the app is a **training tool**, not just a quiz.

Example:
- ❌ Incorrect: "Hexacopter"
- ✅ Correct: "Quadcopter"
- Explanation: "Quadcopters have 4 rotors arranged symmetrically."
- Tip: "Count the arms/rotors — 4 arms = quad."

---

### End-of-Quiz Screen
- Score
- Accuracy %
- Review incorrect answers
- Retry option
- Return home

---

## ❗ Question Interaction Types

### Type A: Multiple Choice
- 1 image
- 4 answer choices

### Type B: Image Selection
- 4 images displayed
- User taps correct image

---

## 📊 STARTER QUESTION SET (MINIMUM 10 REQUIRED)

Copilot MUST implement these exact questions first before scaling.

---

### 🟦 Q1 — Quadcopter Identification
- Question: What type of drone is shown in this image?
- Definition: A quadcopter is a drone with four rotors.
- Choices:
  - Quadcopter ✅
  - Hexacopter
  - Tricopter
  - Single-rotor
- Explanation: Quadcopters have four rotors and are the most common drone type.
- Tip: Count the rotors — 4 = quad.

---

### 🟦 Q2 — Hexacopter Identification
- Question: What type of drone is shown in this image?
- Definition: A hexacopter is a drone with six rotors.
- Choices:
  - Tricopter
  - Quadcopter
  - Hexacopter ✅
  - Fixed-wing
- Explanation: Hexacopters use six rotors for increased lift and stability.
- Tip: More rotors = more lift capability.

---

### 🟦 Q3 — Tricopter Identification
- Question: What type of drone is shown in this image?
- Definition: A tricopter is a drone with three rotors.
- Choices:
  - Quadcopter
  - Tricopter ✅
  - Hexacopter
  - Single-rotor
- Explanation: Tricopters use three rotors.
- Tip: Look for 3 arms instead of 4 or 6.

---

### 🟦 Q4 — Single Rotor Identification
- Question: What type of drone is shown in this image?
- Definition: A single-rotor drone uses one main rotor and typically a tail rotor.
- Choices:
  - Fixed-wing
  - Hexacopter
  - Single-rotor ✅
  - Quadcopter
- Explanation: Single-rotor drones resemble helicopters.
- Tip: One main rotor + tail rotor = single-rotor.

---

### 🟩 Q5 — Fixed-Wing Drone
- Question: What type of aerial system is shown?
- Definition: A fixed-wing drone generates lift with wings and relies on forward motion.
- Choices:
  - Quadcopter
  - Fixed-wing drone ✅
  - Tricopter
  - Hexacopter
- Explanation: Fixed-wing drones rely on forward motion and wings.
- Tip: Wings + no hover = fixed-wing.

---

### 🟩 Q6 — Flying Wing Identification
- Question: What type of aerial platform is shown?
- Definition: A flying wing is an aircraft design with little or no distinct fuselage or tail.
- Choices:
  - Traditional aircraft
  - Flying wing drone ✅
  - Helicopter
  - Quadcopter
- Explanation: Flying wings lack fuselage/tail.
- Tip: If it's just a wing shape → flying wing.

---

### 🟨 Q7 — Payload Detection (HAS Payload)
- Question: Tap the drone that HAS a payload attached.
- Type: Image Selection
- Definition: A payload is equipment carried by the drone, such as a camera, sensor, or cargo.
- Correct: Drone with payload
- Explanation: Payload = camera/sensor/cargo.
- Tip: Look under the drone.

---

### 🟨 Q8 — Payload Detection (NO Payload)
- Question: Tap the drone that DOES NOT have a payload attached.
- Type: Image Selection
- Definition: No payload means there is no mounted equipment attached under the drone.
- Correct: Drone without payload
- Explanation: No attachments underneath.
- Tip: Clean underside.

---

### 🟥 Q9 — Aircraft vs Drone (Wide Lights)
- Question: Based on the lights and spacing, what is this?
- Definition: Traditional aircraft navigation lights are typically farther apart due to larger wingspan.
- Choices:
  - Drone
  - Aircraft ✅
  - Helicopter
  - Satellite
- Explanation: Aircraft lights are widely spaced.
- Tip: Wide spread = aircraft.

---

### 🟥 Q10 — Drone Light Pattern (Cluster)
- Question: Based on the light pattern, what is this object?
- Definition: Drone lights are usually closer together because of the compact airframe.
- Choices:
  - Aircraft
  - Drone ✅
  - Helicopter
  - Glider
- Explanation: Drone lights are clustered.
- Tip: Tight cluster = drone.

---

## 📦 Data Structure Requirement

```ts
type ChoiceIndex = 0 | 1 | 2 | 3;

type BaseQuestion = {
  id: string;
  question: string;
  images: string[];
  definition: string;
  explanation: string;
  tip: string;
};

type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple_choice";
  images: [string];
  choices: [string, string, string, string];
  correctAnswerIndex: ChoiceIndex;
};

type ImageSelectionQuestion = BaseQuestion & {
  type: "image_selection";
  images: [string, string, string, string];
  choices?: never;
  correctAnswerIndex: ChoiceIndex;
};

type Question = MultipleChoiceQuestion | ImageSelectionQuestion;
```

---

## Asset Convention (Implementation-Ready Minimum)

Use local static assets with predictable IDs so question data can be wired immediately.

### Folder structure

```txt
assets/
  images/
    questions/
      q1/
        option-0.jpg
        option-1.jpg
        option-2.jpg
        option-3.jpg
```

### Naming rules

- One folder per question ID (for example: q1, q2, ... q10)
- For multiple_choice, use one image at index 0
- For image_selection, provide exactly four images in display order (index 0-3)
- Keep filenames stable (option-0.jpg to option-3.jpg) to align with correctAnswerIndex

### Example mapping

```ts
const q1: MultipleChoiceQuestion = {
  id: "q1",
  type: "multiple_choice",
  question: "What type of drone is shown in this image?",
  images: ["assets/images/questions/q1/option-0.jpg"],
  choices: ["Quadcopter", "Hexacopter", "Tricopter", "Single-rotor"],
  correctAnswerIndex: 0,
  definition: "A quadcopter is a drone with four rotors.",
  explanation: "Quadcopters have four rotors and are the most common drone type.",
  tip: "Count the rotors - 4 means quad.",
};

const q7: ImageSelectionQuestion = {
  id: "q7",
  type: "image_selection",
  question: "Tap the drone that HAS a payload attached.",
  images: [
    "assets/images/questions/q7/option-0.jpg",
    "assets/images/questions/q7/option-1.jpg",
    "assets/images/questions/q7/option-2.jpg",
    "assets/images/questions/q7/option-3.jpg",
  ],
  correctAnswerIndex: 2,
  definition: "A payload is equipment carried by the drone (camera, sensor, or cargo).",
  explanation: "The correct image shows a visible attachment under the airframe.",
  tip: "Check the underside for mounted equipment.",
};
```