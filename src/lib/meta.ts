export const generateEventId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

export const getFbCookies = (): { fbp: string | undefined; fbc: string | undefined } => {
  if (typeof document === "undefined") return { fbp: undefined, fbc: undefined };
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
  };
  const fbc =
    getCookie("_fbc") ||
    new URLSearchParams(window.location.search).get("fbclid") ||
    undefined;
  return { fbp: getCookie("_fbp"), fbc };
};
