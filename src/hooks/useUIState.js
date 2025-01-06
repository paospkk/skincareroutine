//hook for UI-related state and functions.

import { useState, useCallback } from 'react';

const useUIState = () => {
  const [showRestartConfirmation, setShowRestartConfirmation] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const handleRestartClick = useCallback(() => {
    setShowRestartConfirmation(true);
  }, []);

  const handleRestartCancel = useCallback(() => {
    setShowRestartConfirmation(false);
  }, []);

  const toggleSocialLinks = useCallback(() => {
    setShowSocialLinks(prevState => !prevState);
  }, []);

  return {
    showRestartConfirmation,
    showSocialLinks,
    handleRestartClick,
    handleRestartCancel,
    toggleSocialLinks,
    setShowRestartConfirmation,
  };
};

export default useUIState;