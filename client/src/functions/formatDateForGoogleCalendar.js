// Function to format the date in the required format for Google Calendar
const formatDateForGoogleCalendar = (dateString) => {
    const date = new Date(dateString);
  
    // Adjusting to user's local timezone before converting to UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    // Return the date in Google Calendar's expected format: YYYYMMDDTHHMMSSZ
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`; // Ensure the time is in UTC
  };
  
  export default formatDateForGoogleCalendar;