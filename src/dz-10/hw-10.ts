
interface IMovie {
    title: string;
    releaseYear: number;
    rating: number;
    awards: string[];
}

interface IFilmCategory {
    name: string;
    films: IMovie[];
}

type MatchFilter = {
    filter: string
};
type RangeFilter = {
    filter: number;
    filterTo: number
};
type ValueSearchFilter = {
    values: string[]
};

type Filter<T> = T extends string ? MatchFilter : T extends number ? RangeFilter : ValueSearchFilter;

interface IFiltersState {
    matchFilter?: Filter<string>;
    rangeFilter?: Filter<number>;
    valueSearchFilter?: Filter<string[]>;
}

interface IMovieList<T> {
    applySearchValue(searchValue: T): IMovie[];
    applyFiltersValue(filters: IFiltersState): IMovie[];
}

interface IFilmCategoryList<T> {
    applySearchValue(searchValue: T): IFilmCategory[];
    applyFiltersValue(filters: IFiltersState): IFilmCategory[];
}

class MovieList<T> implements IMovieList<T> {
    private movies: IMovie[];
    private filters: IFiltersState;

    constructor(movies: IMovie[]) {
        this.movies = movies;
        this.filters = {};
    }

    applySearchValue(searchValue: T): IMovie[] {
        this.filters.matchFilter = { filter: searchValue as string };
        return this.applyFilters();
    }

    applyFiltersValue(filters: IFiltersState): IMovie[] {
        this.filters = filters;
        return this.applyFilters();
    }

    private applyFilters(): IMovie[] {
        return this.movies.filter(movie =>
            (!this.filters.matchFilter || movie.title === this.filters.matchFilter.filter) &&
            (!this.filters.rangeFilter || (movie.releaseYear >= this.filters.rangeFilter.filter &&
                movie.releaseYear <= this.filters.rangeFilter.filterTo)) &&
            (!this.filters.valueSearchFilter || this.filterByValues(movie.awards, this.filters.valueSearchFilter.values))
        );
    }

    private filterByValues(awards: string[], values: string[]): boolean {
        for (const value of values) {
            if (awards.includes(value)) {
                return true;
            }
        }
        return false;
    }
}

class FilmCategoryList<T> implements IFilmCategoryList<T> {
    private categories: IFilmCategory[];
    private filters: IFiltersState;

    constructor(categories: IFilmCategory[]) {
        this.categories = categories;
        this.filters = {};
    }

    applySearchValue(searchValue: T): IFilmCategory[] {
        this.filters.matchFilter = { filter: searchValue as string };
        return this.applyFilters();
    }

    applyFiltersValue(filters: IFiltersState): IFilmCategory[] {
        this.filters = filters;
        return this.applyFilters();
    }

    private applyFilters(): IFilmCategory[] {
        return this.categories.map(category => ({
            ...category,
            films: category.films.filter(movie =>
                (!this.filters.matchFilter || movie.title === this.filters.matchFilter.filter) &&
                (!this.filters.rangeFilter || (movie.releaseYear >= this.filters.rangeFilter.filter &&
                    movie.releaseYear <= this.filters.rangeFilter.filterTo)) &&
                (!this.filters.valueSearchFilter || this.filterByValues(movie.awards, this.filters.valueSearchFilter.values))
            )
        }));
    }

    private filterByValues(awards: string[], values: string[]): boolean {
        for (const value of values) {
            if (awards.includes(value)) {
                return true;
            }
        }
        return false;
    }
}

