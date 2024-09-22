import { useEffect, useState } from "react";

// Checks if the code is running on the client side
// Useful when we want to safely run only client-side hooks such as useMediaQuery, useLocalStorage, etc.
export default function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
