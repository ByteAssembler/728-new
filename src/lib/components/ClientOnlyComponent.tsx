import React, { useEffect, useState } from 'react';

const ClientOnly = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Render nothing on the server
  return children;
};

export default ClientOnly;
