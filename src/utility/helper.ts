import { ClassRoutineData } from '../interfaces/classInterfaces';
import { ObjectKeysInterface } from '../interfaces/commonInterfaces';

export const isObjectEmpty = (obj: ObjectKeysInterface): boolean => !Object.keys(obj).length;

export const logout = () => {
  //remove token from localStorage
  localStorage.removeItem('userInformation');

  // set window location to login
  window.location.href = '/login';
};

export const convertTimeTableToCSV = (data: ClassRoutineData[]) => {
  const generalHeader = ['Subject Id', 'Subject Name', 'Day', 'Start Time', 'End Time', 'Room Name', 'Faculty Name'];

  const escapeCSV = (text: string) => `"${text.replace(/"/g, '""')}"`;

  const generalRows = data.map((item) => [
    escapeCSV(item.course.code),
    escapeCSV(item.course.name),
    escapeCSV(item.timeSlot.day),
    escapeCSV(item.timeSlot.startTime),
    escapeCSV(item.timeSlot.endTime),
    escapeCSV(item.classroom.name),
    escapeCSV(`${item.lecturer.fullName} and ${item.lecturer.email}`)
  ]);

  return [generalHeader.join(','), ...generalRows].join('\n');
};
