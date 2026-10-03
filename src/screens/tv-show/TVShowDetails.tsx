import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import CastSection from "@/components/details-screen-components/cast-section/CastSection";
import PageWrapper from "@/components/details-screen-components/details-page-wrapper/DetailsPageWrapper";
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
import { useGetTvShowFullDetails } from "@/hooks/api/tv-show/useGetTvShowFullDetails";
import { getFlagEmoji } from "@/lib/getFlagEmoji";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Star, StarPlus } from "lucide-react-native";
import { useLayoutEffect, useState } from "react";

function TVShowDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const navigation = useNavigation();

  const { data, isLoading, isError } = useGetTvShowFullDetails(id);

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

  const dateSpanText = (): string | number => {
    const isShowEnded = data.status === "Canceled" || data.status === "Ended";
    const startYear = new Date(data.first_air_date).getFullYear();
    const lastYear = new Date(data.last_air_date).getFullYear();

    if (!isShowEnded) return `${startYear} -`;

    if (startYear === lastYear) return startYear;

    return `${startYear} - ${lastYear}`;
  };

  return (
    <PageWrapper>
      <MainSection
        img={data.poster_path}
        vote_average={data.vote_average}
        account_states={data.account_states}
      >
        <View style={{ flex: 1, gap: 10 }}>
          <View>
            <Text variant="subtitle">{data.name}</Text>
            {data.name !== data.original_name && (
              <Text variant="caption" style={{ fontSize: 16 }}>
                {data.original_name}
              </Text>
            )}
            <Text variant="caption" style={{ fontWeight: 500, fontSize: 16 }}>
              {dateSpanText()}
            </Text>
          </View>
          <View>
            {data.episode_run_time.length > 0 && (
              <Text style={{ fontSize: 16 }}>
                Runtime: ~
                {data.episode_run_time.reduce((acc, curr) => acc + curr, 0) /
                  data.episode_run_time.length}{" "}
                min
              </Text>
            )}
            <Text className="text-2xl" style={{ fontSize: 16 }}>
              Country of Origin:{" "}
              {data.origin_country.map((f) => getFlagEmoji(f))}
            </Text>
            <Text style={{ fontSize: 16 }}>
              Seasons: {data.number_of_seasons}
            </Text>
            <Text style={{ fontSize: 16 }}>
              Episodes: {data.number_of_episodes}
            </Text>
            {data.last_episode_to_air && (
              <Text style={{ fontSize: 16 }}>
                Runtime: ~{data.last_episode_to_air.runtime} min
              </Text>
            )}
          </View>
        </View>
      </MainSection>
      <GenresSection genres={data.genres} />
      <OverviewSection overview={data.overview} />
      <KeywordsSection data={data.keywords.results} />
      <CastSection
        type="created_by"
        title="Created By"
        data={data.created_by}
      />
      <CastSection
        type="crew"
        title="Crew"
        data={data.aggregate_credits.crew}
      />
      <CastSection
        type="cast"
        title="Cast"
        data={data.aggregate_credits.cast}
      />
      <RecommendationsTitles id={id} type="tv" />
      <SimilarTitles id={id} type="tv" />
      <ExtraSection imdb={data.external_ids.imdb_id} />
      <RatingModal
        item={data}
        isVisible={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </PageWrapper>
  );
}

export default TVShowDetails;
