import { Lum0x } from "lum0x-sdk";
import { Cast, User } from "./interface";

Lum0x.init(process.env.LUM0X_API_KEY || "");

let scoreBoard: { [key: number]: { totalScore: number; likes: number; recasts: number; replies: number; uniqueChannels: number; uniqueMentions: number; } } = {};

let reactionScore = 1;
let replyScore = 2;
let recastScore = 3;

export interface TopInfluencer {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  power_badge: boolean;
  likes: number;
  recasts: number;
  replies: number;
  uniqueChannels: number;
  uniqueMentions: number;
}

function getUniqueFidsFromReaction(cast: Cast) {
  const reactionFids = cast.reactions.fids;
  const recastFids = cast.recasts.fids;

  const uniqueFids: number[] = [];

  reactionFids.forEach(fid => {
    if (!uniqueFids.includes(fid)) {
      uniqueFids.push(fid);
    }
  });

  recastFids.forEach(fid => {
    if (!uniqueFids.includes(fid)) {
      uniqueFids.push(fid);
    }
  });

  return uniqueFids;
}

export async function getUsersFromFids(fids: number[]) {
  const fidsString = fids.join(",");
  
  const res = await Lum0x.farcasterUser.getUserByFids({
    fids: fidsString,
  })

  const userData = res.users

  const users: User[] = [];
  for (const user of userData) {
    const { fid, username, display_name, pfp_url, follower_count, following_count, power_badge } = user;
    users.push({ fid, username, display_name, pfp_url, follower_count, following_count, power_badge });
  }

  return users;
}

async function processCastsByFid(fid: number) {
  const data = await Lum0x.farcasterCast.getCastsByFid({
    fid: fid,
    limit: 10,
  });
  
  const { casts } = data.result

  let likes = 0
  let recasts = 0
  let replies = 0

  for (const cast of casts) {
    likes += cast.reactions.likes_count
    recasts += cast.recasts.recasts_count
    replies += cast.replies.count
  }

  scoreBoard[fid] = {
    totalScore: likes * reactionScore + recasts * recastScore + replies * replyScore,
    likes,
    recasts,
    replies,
    uniqueChannels: 0,
    uniqueMentions: 0
  }
}

export async function getTopInfluencerOfMyFans(fid: number): Promise<TopInfluencer> {
  console.log('Processing fid, time: ', new Date());

  const data = await Lum0x.farcasterCast.getCastsByFid({
    fid: fid,
    limit: 1,
  });

  console.log('Got Casts, time: ', new Date() );

  const { casts } = data.result

  const fanFids: number[] = []
  for (const cast of casts) {
    const uniqueFids = getUniqueFidsFromReaction(cast);
    // filter if there is an fid in uniqueFids that is already in fanFids
    const filteredFids = uniqueFids.filter(fid => !fanFids.includes(fid));
    fanFids.push(...filteredFids);
  }
  console.log('Got fanFids, time: ', new Date() );
  console.log('length of fanFids: ', fanFids.length);

  for (const fanFid of fanFids) {
    await processCastsByFid(fanFid);
  }

  console.log('Processed all fanFids, time: ', new Date() );

  const sortedScoreBoard = Object.entries(scoreBoard).sort((a, b) => b[1].totalScore - a[1].totalScore);
  console.log('Sorting Done, time: ', new Date() );
  const topInfluencerFid = parseInt(sortedScoreBoard[0][0]);
  const topInfluencer = await getUsersFromFids([topInfluencerFid]);
  return {
    fid: topInfluencerFid,
    username: topInfluencer[0].username,
    display_name: topInfluencer[0].display_name,
    pfp_url: topInfluencer[0].pfp_url,
    follower_count: topInfluencer[0].follower_count,
    following_count: topInfluencer[0].following_count,
    power_badge: topInfluencer[0].power_badge,
    likes: sortedScoreBoard[0][1].likes,
    recasts: sortedScoreBoard[0][1].recasts,
    replies: sortedScoreBoard[0][1].replies,
    uniqueChannels: sortedScoreBoard[0][1].uniqueChannels,
    uniqueMentions: sortedScoreBoard[0][1].uniqueMentions
  };
}