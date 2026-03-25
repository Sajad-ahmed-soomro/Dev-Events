import { Suspense } from "react";
import EventDetail from "@/components/EventDetail";

// This is the page component - it should NOT be async
const EventDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        {/* Pass the params Promise directly to the wrapper */}
        <EventDetailWrapper params={params} />
      </Suspense>
    </main>
  );
};

// This wrapper component handles awaiting the params
// It's inside the Suspense boundary, so it's safe to be async
async function EventDetailWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetail slug={slug} />;
}

export default EventDetailsPage;