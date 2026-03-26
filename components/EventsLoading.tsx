// components/EventsLoading.tsx
export default function EventsLoading() {
  return (
    <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-dark-100 border border-border-dark rounded-lg overflow-hidden card-shadow animate-pulse">
          <div className="h-[200px] bg-dark-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-dark-200 rounded w-3/4"></div>
            <div className="h-4 bg-dark-200 rounded w-full"></div>
            <div className="h-4 bg-dark-200 rounded w-5/6"></div>
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-dark-200 rounded w-1/2"></div>
              <div className="h-3 bg-dark-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}