/** @jsxImportSource frog/jsx */
import { Box } from '../api/[[...routes]]/ui'
import { TopInfluencer } from '../api/utils/lum0x-helpers'

export function getShareImage(
    displayName: string,
    topInfluencer: TopInfluencer
) {
    // if one of params in topInfluencer is NaN, turn it into 0
    topInfluencer = sanitizeInfluencerData(topInfluencer);
    return (
        <Box
            grow
            alignVertical="center"
            padding="10"
            paddingBottom="26"
            marginTop="2"
            marginBottom="2"
            position='relative'
        >
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                <img src="/Result.png"/>
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 30,
                    left: 570,
                    width: '100%',
                    color: 'white',
                    fontSize: 40,
                    fontFamily: 'coinbase',
                }}
            >
                {displayName}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 134,
                    left: 47,
                    width: '28%',
                    fontFamily: 'Poppins',
                }}
            >
                <img 
                    src={topInfluencer.pfp_url}
                    width={148}
                    height={148}
                    style={{
                        borderRadius: '60%',
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 141,
                    left: 227,
                    width: '100%',
                    color: 'white',
                    fontSize: 54,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.display_name}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 231,
                    left: 227,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.username}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 231,
                    left: 714,
                    width: '100%',
                    color: 'white',
                    fontSize: 32,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.fid}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 432,
                    left: 67,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.following_count}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 432,
                    left: 412,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.follower_count}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 432,
                    left: 724,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.power_badge}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 689,
                    left: 70,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.likes}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 689,
                    left: 407,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.recasts}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 689,
                    left: 746,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.replies}`}
            </div>
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 869,
                    left: 70,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.uniqueChannels}`}
            </div> 
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 869,
                    left: 545,
                    width: '100%',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: 'coinbase',
                }}
            >
                {`${topInfluencer.uniqueMentions}`}
            </div> 
        </Box>
    )
}

// Helper function to ensure a value is a number or default to 0
const ensureNumber = (value: any): number => (isNaN(value) ? 0 : value);

function sanitizeInfluencerData(influencer: TopInfluencer): TopInfluencer {
  return {
    ...influencer,
    follower_count: ensureNumber(influencer.follower_count),
    following_count: ensureNumber(influencer.following_count),
    likes: ensureNumber(influencer.likes),
    recasts: ensureNumber(influencer.recasts),
    replies: ensureNumber(influencer.replies),
    uniqueChannels: ensureNumber(influencer.uniqueChannels),
    uniqueMentions: ensureNumber(influencer.uniqueMentions),
  };
}