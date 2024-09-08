export default function SettingsPage() {
    return (
      <div className="text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Settings Overview</h1>
        <p className="mb-4">Welcome to the settings page. Please select a category from the sidebar to manage specific settings.</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Company Settings: Manage your company information
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Theme Settings: Customize the look and feel of your application
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Currency Settings: Configure currency options
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            SMTP Settings: Set up your email server
          </li>
        </ul>
      </div>
    );
  }
  