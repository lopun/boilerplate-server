import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyProfileResponse } from "src/types/graph";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        const foundUser = await User.findOne({ id: user.id });
        return {
          ok: true,
          error: null,
          user: foundUser!
        };
      }
    )
  }
};

export default resolvers;
