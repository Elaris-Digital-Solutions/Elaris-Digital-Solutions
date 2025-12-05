import { useEffect } from "react";

const MEETING_URL = "https://calendly.com/contact-elarisdigitalsolutions/30min?month=2025-12";

const MeetsRedirect = () => {
  useEffect(() => {
    window.location.replace(MEETING_URL);
  }, []);

  return null;
};

export default MeetsRedirect;
