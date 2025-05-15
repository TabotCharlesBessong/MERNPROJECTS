import UAParser from "ua-parser-js";
import { format, formatDistanceToNowStrict, isPast } from "date-fns";
import { Smartphone, Laptop, LucideIcon } from "lucide-react";

type DeviceType = "desktop" | "mobile";

interface SessionInfo {
  deviceType: string;
  browser: string;
  os: string;
  timeAgo: string;
  icon: LucideIcon;
}

export const parseSession = (
  userAgent: string,
  createdAt: string
): SessionInfo => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceType = result.device.type || "Desktop";
  const browser = `${result.browser.name}` || "Web";
  const os = `${result.os.name} ${result.os.version}`;

  // Choose an icon based on device type
  const icon = deviceType === "mobile" ? Smartphone : Laptop;

  // Format expiration information
  const formattedAt = isPast(new Date(createdAt))
    ? `${formatDistanceToNowStrict(new Date(createdAt))} ago`
    : format(new Date(createdAt), "d MMM, yyyy");

  return {
    deviceType,
    browser,
    os,
    timeAgo: formattedAt,
    icon,
  };
};
