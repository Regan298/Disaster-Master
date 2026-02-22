using System;

namespace DisasterSimulator.Core
{
    public static class TimeUtils
    {
        public static float ParseTime(string timeString)
        {
            if (string.IsNullOrEmpty(timeString)) return 0;
            string[] parts = timeString.Split(':');
            if (parts.Length != 3) return 0;

            float hours = float.Parse(parts[0]);
            float minutes = float.Parse(parts[1]);
            float seconds = float.Parse(parts[2]);

            return hours * 3600 + minutes * 60 + seconds;
        }

        public static string FormatTime(float totalSeconds)
        {
            int hours = (int)(totalSeconds / 3600);
            int minutes = (int)((totalSeconds % 3600) / 60);
            int seconds = (int)(totalSeconds % 60);
            return $"{hours:00}:{minutes:00}:{seconds:00}";
        }
    }
}
