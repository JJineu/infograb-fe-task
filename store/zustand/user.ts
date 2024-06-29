import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface User {
  name: string;
  team: string;
}

interface State {
  user: User;
}

interface Actions {
  setName: (name: string) => void;
  setTeam: (team: string) => void;
}

export const useUserStore = create<State & Actions>()(
  immer((set) => ({
    user: {
      name: '',
      team: '',
    },
    setName: (name: string) =>
      set((state) => {
        state.user.name = name;
      }),
    setTeam: (team: string) =>
      set((state) => {
        state.user.team = team;
      }),
  })),
);
