import { create } from 'zustand';

type NavState = {
	sideCollapsed: boolean;
};

type NavAction = {
	switchSideCollapsed: () => void;
	setSideCollapsed: () => void;
};

export const useNav = create<NavState & NavAction>((set, get) => ({
	sideCollapsed: true,
	switchSideCollapsed: () =>
		set((state) => ({ sideCollapsed: !state.sideCollapsed })),
	setSideCollapsed: () => set(() => ({ sideCollapsed: true })),
}));
