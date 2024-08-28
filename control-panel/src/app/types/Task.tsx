export interface Status {
    id: number;
    name: string;
    color: string;
  }
  
  export interface Member {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    image: string;
  }

  export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    image: string;
}

// Define the Attachment interface
export interface Attachment {
  id: number;
  path: string;
  fileName: string;
  type: string; // Adjust type based on how you categorize attachment types
}

// Update the Task interface to include the new Attachment type
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: Status;
  createdDate: string;
  dueDate: string | null;
  assignee: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  assignedBy: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  highlight: string | null;
  project: number;
  attachments: Attachment[]; // Use the Attachment type here
  hasComments: boolean;
}



  export interface ApiResponse {
    boards: Status[];
    settings: any;
    data: {
      [key: number]: {
        tasks: Task[];
      };
    };
  }


  