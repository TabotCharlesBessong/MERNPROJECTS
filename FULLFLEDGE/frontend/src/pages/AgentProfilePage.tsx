import { useOne } from "@pankod/refine-core";
import { Typography } from "@pankod/refine-mui";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";

const AgentProfilePage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something went wromg</div>;

  return (
		<>
			<Profile
				type="Agent"
				name={myProfile.name}
				email={myProfile.email}
				avatar={myProfile.avatar}
				properties={myProfile.allPropertiess}
			/>
		</>
  );
};
export default AgentProfilePage;
