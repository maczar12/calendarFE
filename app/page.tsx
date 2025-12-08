'use client';

import { useSettings } from './hooks/useSettings';
import Calendar from './components/Calendar';

export default function Home() {
  const { settings, isLoading, isError } = useSettings();

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Fetching</div>;

  return (
    <div>
      {settings ? (
        <>
          <h1>Calendar</h1>
          <Calendar weekStart={settings.weekStart} />
        </>
      ) : (
        <div>No Calendar</div>
      )}
    </div>
  );
}
