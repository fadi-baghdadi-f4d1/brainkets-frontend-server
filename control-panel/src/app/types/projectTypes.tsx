// src/types/projectTypes.ts

  
 export interface Project {
    id: number;
    name: string;
    status: string;
    members: {
      id: string;
      userName: string;
      firstName: string;
      lastName: string;
      image: string | null;
      isProjectAdmin: number;
    }[];
    clients: {
      id: string;
      userName: string;
      firstName: string;
      lastName: string;
      image: string | null;
    }[];
    tasksCount: number;
    image: {
      path: string;
    } | null;
  }