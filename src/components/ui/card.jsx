const Card = ({ className = "", ...props }) => (
    <div className={`rounded-lg border border-gray-700 bg-gray-800 ${className}`} {...props} />
  );
  
  const CardContent = ({ className = "", ...props }) => (
    <div className={`p-6 ${className}`} {...props} />
  );
  
  export { Card, CardContent };