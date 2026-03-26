// app/create-event/page.tsx
import CreateEventForm from '@/components/CreateEventForm';

export const metadata = {
  title: 'Create Event | EventFlow',
  description: 'Create a new event for your audience',
};

export default function CreateEventPage() {
  return (
    <main className="min-h-screen py-8">
      <CreateEventForm />
    </main>
  );
}