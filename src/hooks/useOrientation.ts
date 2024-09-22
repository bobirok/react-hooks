import { useLayoutEffect, useState } from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: "UNKNOWN",
  });

  useLayoutEffect(() => {
    const handleChange = () => {
      const { angle, type } = window.screen.orientation;

      setOrientation({
        angle,
        type,
      });
    };

    const handleOrientationChange = () => {
      setOrientation({
        angle: window.orientation,
        type: "UNKNOWN",
      });
    };

    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener("change", handleChange);
    } else {
      handleOrientationChange();
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      }
    };
  }, []);

  return orientation;
}
