/// <reference types="svelte" />
declare function useRemember<State>(initialState: State, key?: string): import("svelte/store").Writable<State>;
export default useRemember;
