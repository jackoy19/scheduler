export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Lesson {
  title: string;
  duration: number;
}

export interface Availability {
  id: number;
  day: Day;
  startTime: string;
  endTime: string;
}

export interface Schedule {
  availabilityId: number;
  lessons: { title: string; duration: number }[];
}

function timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

class Scheduler {
  constructor(lessons: Lesson[], availabilities: Availability[]) { }

  schedule(
    lessons: Lesson[],
    availabilities: Availability[]
  ): Schedule[] {
    const lessonQueue = lessons.map(lesson => ({ ...lesson })); // Deep copy
    const schedules: Schedule[] = [];

    for (const availability of availabilities) {
      const start = timeStringToMinutes(availability.startTime);
      const end = timeStringToMinutes(availability.endTime);
      let remainingTime = end - start;

      const scheduledLessons: { title: string; duration: number }[] = [];

      while (lessonQueue.length && remainingTime > 0) {
        const currentLesson = lessonQueue[0];

        if (currentLesson.duration <= remainingTime) {
          scheduledLessons.push({ title: currentLesson.title, duration: currentLesson.duration });
          remainingTime -= currentLesson.duration;
          lessonQueue.shift(); // done
        } else {
          scheduledLessons.push({ title: currentLesson.title, duration: remainingTime });
          currentLesson.duration -= remainingTime;
          remainingTime = 0;
        }
      }

      schedules.push({
        availabilityId: availability.id,
        lessons: scheduledLessons,
      });
    }

    return schedules;
  }
}

export default Scheduler;
