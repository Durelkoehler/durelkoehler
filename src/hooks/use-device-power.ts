"use client";

import { useEffect, useState } from "react";

interface DeviceCapabilities {
  isLowPower: boolean;
  cores: number;
  memory: number;
  saveData: boolean;
}

export function useDevicePower(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowPower: false,
    cores: 8, // Optimistic default for SSR
    memory: 8,
    saveData: false,
  });

  useEffect(() => {
    // Standard checks for modern browsers
    const cores = navigator.hardwareConcurrency || 4;
    
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    
    // Network data saver check
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const saveData = connection ? !!connection.saveData : false;

    // A device is categorized as Low Power if it has:
    // - Less than 4 CPU cores
    // - Less than 4 GB of RAM
    // - User has "Data Saver" enabled on their connection
    const isLowPower = cores < 4 || memory < 4 || saveData;

    setTimeout(() => {
      setCapabilities({
        isLowPower,
        cores,
        memory,
        saveData,
      });
    }, 0);
  }, []);

  return capabilities;
}
