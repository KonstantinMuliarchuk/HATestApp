import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Reward} from '../types';

type RewardsState = {
  rewards: Reward[];
  collectedRewardsIds: number[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasNextPage: boolean;
  isLoadingNextPage: boolean;
};

type Response = {
  data: {
    results: Reward[];
    next: string | null;
  };
};

const initialState: RewardsState = {
  rewards: [],
  collectedRewardsIds: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasNextPage: true,
  isLoadingNextPage: false,
};

// Fetch initial rewards (first page)
export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async () => {
    const response: Response = await axios.get(
      'https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=20&page=1',
    );

    return {
      rewards: response.data.results.filter(result => result.image),
      hasNextPage: Boolean(response.data.next),
      currentPage: 1,
    };
  },
);

// Fetch next page of rewards
export const fetchNextRewards = createAsyncThunk(
  'rewards/fetchNextRewards',
  async (_, {getState}) => {
    const state = getState() as {rewards: RewardsState};

    // Prevent fetching if no next page
    if (!state.rewards.hasNextPage) {
      return {
        rewards: [],
        hasNextPage: false,
        currentPage: state.rewards.currentPage,
      };
    }

    const nextPage = state.rewards.currentPage + 1;
    const response: Response = await axios.get(
      `https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=20&page=${nextPage}`,
    );

    return {
      rewards: response.data.results.filter(result => result.image),
      hasNextPage: Boolean(response.data.next),
      currentPage: nextPage,
    };
  },
);

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    collectReward: (state, action) => {
      if (!state.collectedRewardsIds.includes(action.payload)) {
        state.collectedRewardsIds.push(action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRewards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = action.payload.rewards;
        state.currentPage = action.payload.currentPage;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rewards';
      })

      // Handle fetching next page
      .addCase(fetchNextRewards.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNextRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = [...state.rewards, ...action.payload.rewards]; // Append new rewards
        state.currentPage = action.payload.currentPage;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchNextRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch next rewards';
      });
  },
});

export const {collectReward} = rewardsSlice.actions;
export default rewardsSlice.reducer;
