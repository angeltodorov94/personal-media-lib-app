import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import CastSection from "@/components/details-screen-components/cast-section/CastSection";
import DetailsPageWrapper from "@/components/details-screen-components/details-page-wrapper/DetailsPageWrapper";
import ExtraSection from "@/components/details-screen-components/extra-section/ExtraSection";
import GenresSection from "@/components/details-screen-components/genres-section/GenresSection";
import KeywordsSection from "@/components/details-screen-components/keywords-section/KeywordsSection";
import MainSection from "@/components/details-screen-components/main-section/MainSection";
import OverviewSection from "@/components/details-screen-components/overview-section/OverviewSection";
import RecommendationsTitles from "@/components/details-screen-components/recommendations-titles/RecommendationsTitles";
import SimilarTitles from "@/components/details-screen-components/similar-titles/SimilarTitles";
import RatingModal from "@/components/rating-modal/RatingModal";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetMovieFullDetails } from "@/hooks/api/movie/useGetMovieFullDetails";
import { getFlagEmoji } from "@/lib/getFlagEmoji";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Star, StarPlus } from "lucide-react-native";
import { useLayoutEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const navigation = useNavigation();

  const { data, isLoading, isError } = useGetMovieFullDetails(id);

  useLayoutEffect(() => {
    if (!data) return;

    navigation.setOptions({
      rightButton: {
        icon: data.account_states.rated ? Star : StarPlus,
        type: data.account_states.rated ? "primary" : "secondary",
        onPress: () => setIsRatingModalOpen(true),
      },
    });
  }, [navigation, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Error />;
  }

  return (
    <DetailsPageWrapper>
      <MainSection
        img={data.poster_path}
        vote_average={data.vote_average}
        account_states={data.account_states}
      >
        <View style={{ flex: 1, gap: 10 }}>
          <View>
            <Text variant="subtitle">{data.title}</Text>
            {data.title !== data.original_title && (
              <Text variant="caption" style={{ fontSize: 16 }}>
                {data.original_title}
              </Text>
            )}
            <Text variant="caption" style={{ fontWeight: 500, fontSize: 16 }}>
              {new Date(data.release_date).getFullYear()}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>Runtime: {data.runtime} min</Text>
            <Text className="text-2xl" style={{ fontSize: 16 }}>
              Country of Origin:{" "}
              {data.origin_country.map((f) => getFlagEmoji(f))}
            </Text>
          </View>
        </View>
      </MainSection>
      <GenresSection genres={data.genres} />
      <OverviewSection overview={data.overview} />
      <KeywordsSection data={data.keywords.keywords} />
      <CastSection type="crew" title="Crew" data={data.credits.crew} />
      <CastSection type="cast" title="Cast" data={data.credits.cast} />
      <RecommendationsTitles id={id} type="movie" />
      <SimilarTitles id={id} type="movie" />
      <ExtraSection
        imdb={data.imdb_id}
        collectionID={data.belongs_to_collection?.id}
      />
      <RatingModal
        item={data}
        isVisible={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </DetailsPageWrapper>
  );
}
