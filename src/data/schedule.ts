export interface ClassItem {
  id: string;
  time: string;
  day: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  type: 'Reformer' | 'Mat' | 'Private';
}

export const scheduleData: ClassItem[] = [
  { id: 'mon-9', day: 'Mon', time: '9:00', name: 'Gentle Flow Reformer', level: 'Beginner', type: 'Reformer' },
  { id: 'mon-11', day: 'Mon', time: '11:00', name: 'Sculpt & Stretch', level: 'Intermediate', type: 'Reformer' },
  { id: 'mon-18', day: 'Mon', time: '18:00', name: 'Power Reformer', level: 'Advanced', type: 'Reformer' },
  { id: 'tue-10', day: 'Tue', time: '10:00', name: 'Mat Foundations', level: 'Beginner', type: 'Mat' },
  { id: 'tue-12', day: 'Tue', time: '12:30', name: 'Core & Grace', level: 'Intermediate', type: 'Reformer' },
  { id: 'wed-9', day: 'Wed', time: '9:00', name: 'Private Session', level: 'All Levels', type: 'Private' },
  { id: 'wed-17', day: 'Wed', time: '17:00', name: 'Evening Chill', level: 'Intermediate', type: 'Reformer' },
  { id: 'thu-8', day: 'Thu', time: '8:00', name: 'Athlete Reformer', level: 'Advanced', type: 'Reformer' },
  { id: 'thu-11', day: 'Thu', time: '11:00', name: 'Slow Stretch', level: 'Beginner', type: 'Reformer' },
  { id: 'fri-10', day: 'Fri', time: '10:00', name: 'Mat & Release', level: 'Intermediate', type: 'Mat' },
  { id: 'sat-10', day: 'Sat', time: '10:00', name: 'Weekend Bloom', level: 'Beginner', type: 'Reformer' },
  { id: 'sat-14', day: 'Sat', time: '14:00', name: 'Duo Private', level: 'All Levels', type: 'Private' },
];
