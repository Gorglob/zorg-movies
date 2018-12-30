import { DescriptionItem } from './DescriptionItem';

export interface Movie {
    MovieId: number;
    MovieDirectory: string;
    MovieTitle: string;
    ProductionYear: string;
    DateAdded: Date | string | null;
    VideoFormat: string;
    MultiLanguage: boolean;
    AutreInfo: string;
    MovieDetailId: number | null;
    Resume: string;
    PosterPath: string;
    Titre: string;
    TitreOriginal: string;
    ReleaseDate: Date | string | null;
    Note: number | null;
    Genres: DescriptionItem[];
    Casting: DescriptionItem[];
    Realisateurs: DescriptionItem[];

}