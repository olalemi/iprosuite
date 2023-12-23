export interface LaunchData {
  missionName: string;
  launchDate: string;
  launchStatus: string;
  launchId: string;
  success: boolean;
}

export interface FilterState {
  [key: string]: boolean;
  success: boolean;
  failed: boolean;
  "2006-2010": boolean;
  "2011-2015": boolean;
  "2016-2020": boolean;
  "2021-present": boolean;
}

export interface UserContextType {
  data: LaunchData[];
  isLoading: boolean;
  setSortOrder: (order: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  filter: FilterState;
  toggleFilter: (type: keyof FilterState) => void;
  resetFilter: () => void;
}
