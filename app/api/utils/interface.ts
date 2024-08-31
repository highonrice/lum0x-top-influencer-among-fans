export interface Cast {
  reactions: { fids: number[] };
  recasts: { fids: number[] };
}

export interface User {
  fid: number,
  username: string,
  display_name: string,
  pfp_url: string,
  follower_count: number,
  following_count: number,
  power_badge: boolean
}