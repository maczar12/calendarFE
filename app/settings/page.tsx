'use client';

import React from 'react';
import { useSettings } from '../hooks/useSettings';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  const changeWeekStart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ weekStart: Number(event.target.value) });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className="setting-item">
        <label htmlFor="week-start">Week Start: </label>
        <select
          id="week-start"
          value={settings?.weekStart}
          onChange={changeWeekStart}
        >
          <option value={0}>Sunday</option>
          <option value={1}>Monday</option>
          <option value={6}>Saturday</option>
        </select>
      </div>
      <div className="current-value">
        Current value: {settings?.weekStart}
      </div>
      <style jsx>{`
        .setting-item {
          margin: 20px 0;
        }
        select {
          padding: 8px;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}
