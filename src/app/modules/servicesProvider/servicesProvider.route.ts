// ServiceProvider interface
export interface IServiceProvider {
    companyName: string;
    serviceCategory: string;
    description: string;
    serviceAreas: string[];
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    servicesOffered: string[]; // List of services offered by the provider
    workingHours: {
      weekdays: string;
      weekends: string;
    };
    isVerified: boolean;
    isAvailable: boolean;
    profilePicture?: string;
    pricing: {
      // Define pricing details as needed
      hourlyRate?: number;
      dailyRate?: number;
      packageRate?: number;
    };
    reviews: {
      // Define fields related to reviews and ratings
      averageRating: number;
      totalRatings: number;
    };
    insurance: string;
    licenses: string[];
    certifications: string[];
    serviceTags: string[];
    bookingHistory: {
      // Define fields related to booking history or appointments
      bookedDates: Date[];
      completedAppointments: number;
    };
    businessHours: {
      // Define specific business hours if applicable
      monday: string;
      tuesday: string;
      // ... and so on
    };
  }
  