export interface Voter {
  name: string;
  sr_no: string;
  enrolment_no: string;
  address: string;
  city?: string;
  bar_association?: string;
  place_of_voting?: string;
}

export interface FirebaseVoter {
  name: string;
  address: string;
  city: string;
  bar_association: string;
}

export const useVoterSearch = () => {
  const searchVoters = async (query: string): Promise<Voter[]> => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    } catch (error) {
      console.error('Error searching voters:', error);
      return [];
    }
  };

  return { searchVoters };
};
