import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '@/services/projects/GetAllProjectsAPI';
import { Project } from '@/types/projectTypes';  // Import the Project type

interface ProjectsState {
    projects: Project[];  // Use the correct Project type
    loading: boolean;
    error: string | null;
    cache: { [key: string]: Project[] };  // Ensure cache also uses the correct type
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null,
    cache: {},
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async ({ page, filter }: { page: number; filter: string }, { getState }) => {
        const { cache } = (getState() as { projects: ProjectsState }).projects;
        const cacheKey = `projects_page_${page}_filter_${filter}`;

        if (cache[cacheKey]) {
            return { projects: cache[cacheKey], cacheKey };
        } else {
            const data = await getProjects(page, filter);
            return { projects: data.projects, cacheKey };
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload.projects;
                state.cache[action.payload.cacheKey] = action.payload.projects;
                state.loading = false;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load projects';
            });
    },
});

export default projectsSlice.reducer;
