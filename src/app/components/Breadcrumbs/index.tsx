// components/Breadcrumbs.tsx
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Split the pathname to get individual parts of the route
  let pathParts = pathname.split('/').filter((part) => part);

  // Regex pattern for UUIDv4
  const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  // Exclude the last part if it's a UUIDv4
  if (pathParts.length > 1) {
    const lastPart = pathParts[pathParts.length - 1];
    
    if (uuidv4Pattern.test(lastPart)) {
      pathParts = pathParts.slice(0, -1); // Exclude the last part
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-gray-500">
      {pathParts.length > 0 && (
        <ul className="flex items-center space-x-2">
          {pathParts.map((part, index) => {
            // Create the path up to this part
            const href = '/' + pathParts.slice(0, index + 1).join('/');

            return (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                <li
                  className={`cursor-pointer ${index === pathParts.length - 1 ? 'text-gray-700 font-semibold' : ''}`}
                  onClick={() => handleNavigation(href)}
                >
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Breadcrumbs;
