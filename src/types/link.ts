// types/Link.ts
export interface Link {
    id: string;          // Unique identifier for the link
    icon: string;        // Icon URL or class name (e.g., FontAwesome icon)
    url: string;         // The URL the link points to
    title: string;       // Display title for the link
    description?: string; // Optional description for the link
    createdAt?: Date;    // Optional timestamp for when the link was created
    updatedAt?: Date;    // Optional timestamp for when the link was last updated
    isActive?: boolean;  // Optional flag to indicate if the link is active
  }