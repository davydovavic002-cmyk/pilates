import { NotebookSchedule } from '../components/schedule/NotebookSchedule';
import { ScheduleEmbedBridge } from '../components/embed/ScheduleEmbedBridge';

export function SchedulePage() {
  return (
    <>
      <ScheduleEmbedBridge />
      <NotebookSchedule />
    </>
  );
}
