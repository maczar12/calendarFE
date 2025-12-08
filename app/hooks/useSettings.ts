import useSWR from 'swr';

interface Settings {
  weekStart: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSettings() {
  const { data, error, isLoading, mutate } = useSWR<Settings>('/api/settings', fetcher);

  const updateSettings = async (newSettings: Settings) => {
    // Optimistic UI update could be done here, but simple mutation is safer for now
    await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    });
    mutate(); // Revalidate data
  };

  return {
    settings: data,
    isLoading,
    isError: error,
    updateSettings,
  };
}
