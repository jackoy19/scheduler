# 🗓️ Lesson Scheduler Algorithm

This project is a TypeScript-based algorithm that automatically schedules a professor’s lessons based on their weekly availability. The goal is to efficiently allocate lesson durations into available time blocks, even splitting lessons across different availability windows if necessary.

---

## ✨ Features

- Clean and readable TypeScript code
- Smart lesson scheduling that supports partial allocation across availabilities
- Utilizes native `Date`-like logic for time calculations (no external libraries)
- Fully tested using Jest

---

## 🚀 Getting Started

### 1. Clone the repository

bash

```
git clone https://github.com/your-username/lesson-scheduler.git

cd lesson-scheduler
```
### 2. Install dependencies

bash
```
npm install
```
### 3. Run tests

bash
```
npm test
```
---

## 🧠 How It Works
The `schedule()` function accepts:

`lessons`: an array of lessons with a title and duration (in minutes)

`availabilities`: an array of time blocks (per day) where a professor is available

It returns a new array of `schedules` — one for each availability — detailing how the lessons are distributed within the available time.

### 📘 Data Structures

**Lesson**
```
interface Lesson {
  title: string;
  duration: number; // in minutes
}
```
**Availability**
```
interface Availability {
  id: number;
  day: Day; // 0 = Sunday, 6 = Saturday
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
}
```
**Schedule**
```
interface Schedule {
  availabilityId: number;
  lessons: { title: string; duration: number }[];
}
```
## 📦 Example

**Input**
```
const lessons = [
  { title: 'JS Basics', duration: 90 },
  { title: 'JS Fundamentals', duration: 90 },
];

const availabilities = [
  { id: 1, day: 1, startTime: '09:00', endTime: '10:00' },
  { id: 2, day: 2, startTime: '09:00', endTime: '10:00' },
  { id: 3, day: 2, startTime: '13:00', endTime: '14:00' },
];
```
**Output**
```
[
  {
    availabilityId: 1,
    lessons: [
      { title: 'JS Basics', duration: 60 },
    ]
  },
  {
    availabilityId: 2,
    lessons: [
      { title: 'JS Basics', duration: 30 },
      { title: 'JS Fundamentals', duration: 30 },
    ]
  },
  {
    availabilityId: 3,
    lessons: [
      { title: 'JS Fundamentals', duration: 60 },
    ]
  }
]
```
---

## 📌 Notes

Lessons can be split across multiple availability slots.

No external libraries are used — only native JavaScript for time parsing and logic.
