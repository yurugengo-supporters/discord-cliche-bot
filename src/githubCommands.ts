import {Octokit} from 'octokit';

export const octokit = new Octokit({auth: process.env.GITHUB_PAT});


export const fetchUserData = async (userName: string) => {
  try {
    const invitedUserResponse = await octokit.request(
        'GET /users/{username}', {
          username: userName,
        },
    );

    if (invitedUserResponse.status != 200) {
      console.log(`${userName} is not valid user`);
      return null;
    }

    return invitedUserResponse.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const inviteUser = async (userId: number) => {
  try {
    const invitationResponse = await octokit.request(
        'POST /orgs/{org}/invitations', {
          org: 'yurugengo-supporters',
          invitee_id: userId,
        });

    return invitationResponse;
  } catch (err) {
    console.log(err);
    return null;
  }
};
