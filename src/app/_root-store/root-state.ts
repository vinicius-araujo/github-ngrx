import { GithubUserSearchState } from "./github-search-user";
import { RouterStateUrl } from "../_models/router-state-url";
import { RouterReducerState } from "@ngrx/router-store";

export interface RootState {
  githubUserSearch: GithubUserSearchState.State;
  router: RouterReducerState<RouterStateUrl>;
}
