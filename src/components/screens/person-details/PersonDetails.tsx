import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import DetailsPageWrapper from "@/components/details-screen-components/details-page-wrapper/DetailsPageWrapper";
import ExtraSection from "@/components/details-screen-components/extra-section/ExtraSection";
import MainSection from "@/components/details-screen-components/main-section/MainSection";
import OverviewSection from "@/components/details-screen-components/overview-section/OverviewSection";
import { Text } from "@/components/ui/text";
import { useGetPersonFullDetails } from "@/hooks/api/people/useGetPersonFullDetails";
import { useLocalSearchParams } from "expo-router";

function PersonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError } = useGetPersonFullDetails(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Error />;
  }

  return (
    <DetailsPageWrapper>
      <MainSection img={data.profile_path}>
        <Text>{data.name}</Text>
        <Text>{data.birthday + " - " + data.deathday}</Text>
        <Text>{data.gender}</Text>
        <Text>{data.known_for_department}</Text>
        <Text>{data.place_of_birth}</Text>
      </MainSection>
      <OverviewSection overview={data.biography} />
      <ExtraSection imdb={data.imdb_id} />
    </DetailsPageWrapper>
  );
}

export default PersonDetails;
